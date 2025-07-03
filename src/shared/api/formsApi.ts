import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type {
  FormAnswer,
  FormObject,
  Submission,
  TemplateObject,
} from "../../entities";

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
    getTemplateForms: builder.query<{ data: Submission[] }, string>({
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
    getTemplateForForm: builder.query<{ data: TemplateObject }, string>({
      query: (id) => ({
        url: `/formTemplate/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFormQuery,
  useGetTemplateFormsQuery,
  useSubmitFormMutation,
  useGetTemplateForFormQuery,
} = api;
