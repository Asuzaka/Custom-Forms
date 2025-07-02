import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { Comment } from "../../entities";

export const api = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/comments",
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getCommentByTemplateId: builder.query<{ data: Comment[] }, string>({
      query: (data) => ({
        url: `/${data}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentByTemplateIdQuery } = api;
