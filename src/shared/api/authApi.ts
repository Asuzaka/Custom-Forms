import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<{ user: User }, { uni: string; password: string }>(
      {
        query: (user) => ({
          url: "/auth/signin",
          method: "POST",
          body: user,
        }),
      },
    ),
    signout: builder.query<void, void>({
      query: () => ({
        url: "/auth/signout",
        method: "GET",
      }),
    }),
    authenticated: builder.query<{ data: User }, void>({
      query: () => ({
        url: "/auth/authenticated",
        method: "GET",
      }),
    }),
    verify: builder.query<void, string>({
      query: (token) => ({
        url: `/auth/verify/${token}`,
        method: "GET",
      }),
    }),

    forget: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/forgetPassword",
        method: "POST",
        body: data,
      }),
    }),
    reset: builder.mutation<
      void,
      { token: string; password: string; passwordConfirm: string }
    >({
      query: ({ token, ...data }) => ({
        url: `/auth/resetPassword/${token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useResetMutation,
  useForgetMutation,
  useVerifyQuery,
  useLazyAuthenticatedQuery,
  useSignoutQuery,
  useSignupMutation,
  useAuthenticatedQuery,
} = api;
