import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import type { Statistics, TemplateObject, User } from "../../entities";

export const api = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/search",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    globalSearch: builder.query<
      {
        results: { templates: number; tags: number };
        data: { templates: TemplateObject[]; tags: TemplateObject[] };
      },
      string
    >({
      query: (data) => ({
        url: `/?q=${data}`,
        method: "GET",
      }),
    }),
    searchTags: builder.query<{ data: string[] }, string>({
      query: (data) => ({
        url: `/tags?q=${data}`,
        method: "GET",
      }),
    }),
    searchUsers: builder.query<{ data: User[] }, string>({
      query: (data) => ({
        url: `/user?q=${data}`,
        method: "GET",
      }),
    }),
    searchTempaltes: builder.query<{ data: TemplateObject[] }, string>({
      query: (data) => ({
        url: `/template?q=${data}`,
        method: "GET",
      }),
    }),
    getStatistics: builder.query<{ data: Statistics }, void>({
      query: () => ({
        url: `/stats`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGlobalSearchQuery,
  useGetStatisticsQuery,
  useSearchTagsQuery,
  useSearchUsersQuery,
  useSearchTempaltesQuery,
} = api;
