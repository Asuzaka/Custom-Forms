import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User }, { uni: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    authenticated: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/auth/authenticated",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useAuthenticatedQuery } =
  api;
