import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // GET /users/:id
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    // PATCH /users/:id
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    // POST /users
    createUser: builder.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useCreateUserMutation } =
  api;
