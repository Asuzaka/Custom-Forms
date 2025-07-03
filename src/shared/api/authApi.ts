import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserLog, UserReg } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/auth",
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    signin: builder.mutation<{ user: User }, UserLog>({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        error: response.data?.message || "Signin failed",
      }),
      invalidatesTags: ["user"],
    }),
    signup: builder.mutation<{ user: User }, UserReg>({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        error: response.data?.message || "Signup failed",
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
      providesTags: ["user"],
    }),
    verify: builder.mutation<void, string>({
      query: (token) => ({
        url: `/verify/${token}`,
        method: "POST",
      }),
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        error: response.data?.message || "Verify failed",
      }),
      invalidatesTags: ["user"],
    }),

    forget: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/forgetPassword",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        error: response.data?.message || "Forget failed",
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
      invalidatesTags: ["user"],
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        error: response.data?.message || "Reset failed",
      }),
    }),
  }),
});

export const {
  useResetMutation,
  useForgetMutation,
  useVerifyMutation,
  useLazyAuthenticatedQuery,
  useSignoutQuery,
  useSignupMutation,
  useSigninMutation,
  useAuthenticatedQuery,
} = api;
