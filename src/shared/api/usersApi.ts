import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { User } from "../../entities";

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/users",
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.mutation<
      { data: { users: User[] } },
      { users: string[] }
    >({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query<{ data: { users: User[] } }, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    blockUsers: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/block",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    unBlockUsers: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/unblock",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    changeToAdmin: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    changeToUser: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<void, { users: string[] }>({
      query: (data) => ({
        url: "/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersMutation,
  useBlockUsersMutation,
  useUnBlockUsersMutation,
  useChangeToAdminMutation,
  useChangeToUserMutation,
  useDeleteUserMutation,
} = api;
