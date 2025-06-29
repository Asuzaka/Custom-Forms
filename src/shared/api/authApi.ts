import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<
      { user: User },
      { email: string; password: string }
    >({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),
    signout: builder.query<void, void>({
      query: () => ({
        url: "/signout",
        method: "GET",
      }),
    }),
    authenticated: builder.query<{ data: User }, void>({
      query: () => ({
        url: "/authenticated",
        method: "GET",
      }),
    }),
    verify: builder.query<void, string>({
      query: (token) => ({
        url: `/verify/${token}`,
        method: "GET",
      }),
    }),

    forget: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/forgetPassword",
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
  useSigninMutation,
  useAuthenticatedQuery,
} = api;
