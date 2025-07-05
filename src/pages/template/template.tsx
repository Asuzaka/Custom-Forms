import { useNavigate, useParams } from "react-router";
import { NewTemplate } from "./newtemplate";
import {
  useCreateTemplateMutation,
  useGetTemplateQuery,
} from "../../shared/api/templateApi";
import { addToast, Button, Spinner } from "@heroui/react";
import { useSelector } from "react-redux";
import { Comments } from "../../widgets";
import { SocketProvider } from "../../shared/hooks/socketContext";
import type { RootState } from "../../store/store";
import { skipToken } from "@reduxjs/toolkit/query";

export function Template() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [createTemplate, { isLoading: createLoading }] =
    useCreateTemplateMutation();
  const { data, isLoading, error } = useGetTemplateQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  if (error) {
    const err = error as { status: number };
    if (err.status === 401 || err.status === 404) navigate("/notfound");
    else {
      throw Error("Something went wrong");
    }
  }

  if (isLoading)
    return (
      <div className="flex h-[90dvh] items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  const creator = !!(
    data?.data.creator === user?._id ||
    data?.data.allowedUsers?.includes(user?._id || "nothing")
  );

  async function handleClick() {
    if (!user) {
      navigate("/signin");
      return;
    }
    // else
    if (!data?.data) return;

    try {
      const { ...rest } = data.data;
      delete rest._id;

      const cleanDuplicate = {
        ...rest,
        title: rest.title + " (Copy)",
        publish: false,
        likes: 0,
        likedBy: [],
        allowedUsers: [],
        createdAt: undefined,
        updatedAt: undefined,
      };

      const newone = await createTemplate(cleanDuplicate).unwrap();
      addToast({
        title: "Sucess",
        description: "Template was added to your dashboard",
        color: "success",
        timeout: 3000,
      });
      navigate(`/template/${newone._id}`);
    } catch (error) {
      const err = error as { status: number; message: string };
      addToast({
        title: "Error",
        description: err.message,
        color: "danger",
        timeout: 3000,
      });
    }
  }

  return (
    <SocketProvider>
      <NewTemplate Template={data?.data} editor={creator} />
      <Comments templateId={data?.data._id} />
      <Button
        onClick={handleClick}
        className="fixed right-[20px] bottom-[15px]"
        isLoading={createLoading}
        color="primary"
      >
        {user ? "Use & Modify" : "Sign in"}
      </Button>
    </SocketProvider>
  );
}
