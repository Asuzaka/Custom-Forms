import { useNavigate, useParams } from "react-router";
import { NewTemplate } from "./newtemplate";
import { useGetTemplateQuery } from "../../shared/api/templateApi";
import { Spinner } from "@heroui/react";
import { useSelector } from "react-redux";
import { Comments } from "../../widgets";
import { SocketProvider } from "../../shared/hooks/socketContext";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../../store/store";
import type { CustomErrorData } from "../../entities";

export function Template() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) throw Error("No such url exists");
  const { data, isLoading, error } = useGetTemplateQuery(id);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    const errData = err.data as CustomErrorData;

    if (errData.status === 401 || errData.status === 404) {
      navigate("/notfound");
    } else {
      throw Error(errData.message);
    }
  } else if (error) {
    throw Error("Unexpected error occurred");
  }
  const creator = data?.data.creator === user?._id;

  return (
    <>
      <SocketProvider>
        <NewTemplate Template={data?.data} editor={creator} />
        <Comments templateId={data?.data._id} />
      </SocketProvider>
    </>
  );
}
