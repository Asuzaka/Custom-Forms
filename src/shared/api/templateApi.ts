import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { TemplateObject } from "../../entities";

export const api = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/templates",
    credentials: "include",
  }),
  tagTypes: ["Template"],
  endpoints: (builder) => ({
    getUserTemplates: builder.query<{ data: TemplateObject[] }, string>({
      query: (sort) => ({
        url: `/?sort=${sort}`,
        method: "GET",
      }),
      providesTags: ["Template"],
    }),

    createTemplate: builder.mutation<TemplateObject, TemplateObject>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Template"],
    }),

    getTemplate: builder.query<TemplateObject, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Template", id }],
    }),

    updateTemplate: builder.mutation<
      TemplateObject,
      { id: string; data: TemplateObject }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Template", id }],
    }),

    deleteTemplate: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Template"],
    }),
  }),
});

export const {
  useGetUserTemplatesQuery,
  useCreateTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = api;
