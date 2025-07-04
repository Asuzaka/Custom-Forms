import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { FullTemplate, TemplateObject } from "../../entities";

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
    getAllTemplates: builder.query<
      { data: { templates: TemplateObject[] } },
      string
    >({
      query: (params) => ({
        url: `/templates${params}`,
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

    getTemplate: builder.query<{ data: TemplateObject }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Template", id }],
      transformErrorResponse: (response: {
        data: { message: string };
        status: number;
      }) => ({
        status: response.status,
      }),
    }),

    updateTemplate: builder.mutation<
      TemplateObject,
      { id: string; data: Partial<TemplateObject> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Template"],
    }),

    deleteTemplate: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Template"],
    }),

    deleteTemplates: builder.mutation<void, { ids: string[] }>({
      query: (data) => ({
        url: "/templates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Template"],
    }),

    getLatestTemplates: builder.query<{ data: FullTemplate[] }, void>({
      query: () => ({
        url: "/latest",
        method: "GET",
      }),
    }),
    getPopularTemplates: builder.query<{ data: FullTemplate[] }, void>({
      query: () => ({
        url: "/popular/likes",
        method: "GET",
      }),
    }),
    getTags: builder.query<{ data: { _id: string; count: number }[] }, void>({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserTemplatesQuery,
  useCreateTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useDeleteTemplatesMutation,
  useGetAllTemplatesQuery,
  useGetLatestTemplatesQuery,
  useGetPopularTemplatesQuery,
  useGetTagsQuery,
} = api;
