import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FormAnswer, FormObject } from "../../entities";
import { env } from "../config";

export const api = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/forms",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    submitForm: builder.mutation<
      void,
      { templateId: string; answers: FormAnswer[] }
    >({
      query: ({ templateId, answers }) => ({
        url: `/${templateId}`,
        method: "POST",
        body: { answers },
      }),
    }),
    getTemplateForms: builder.query<FormObject[], string>({
      query: (id) => ({
        url: `/template/${id}`,
        method: "GET",
      }),
    }),
    getForm: builder.query<FormObject, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFormQuery,
  useGetTemplateFormsQuery,
  useSubmitFormMutation,
} = api;
