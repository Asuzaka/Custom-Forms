import { useNavigate, useParams } from "react-router";
import { NewTemplate } from "./newtemplate";
import { useGetTemplateQuery } from "../../shared/api/templateApi";
import { Spinner } from "@heroui/react";
import { useSelector } from "react-redux";
import { Comments } from "../../widgets";
import { SocketProvider } from "../../shared/hooks/socketContext";
import type { RootState } from "../../store/store";

export function Template() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetTemplateQuery(id || "");

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

  const creator = data?.data.creator === user?._id;

  return (
    <SocketProvider>
      <NewTemplate Template={data?.data} editor={creator} />
      <Comments templateId={data?.data._id} />
    </SocketProvider>
  );
}
