import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { User } from "../../entities";

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.mutation<{ data: User[] }, { users: string[] }>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query<{ data: User[] }, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    blockUsers: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/block",
        method: "POST",
        body: data,
      }),
    }),
    unBlockUsers: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/unblock",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
