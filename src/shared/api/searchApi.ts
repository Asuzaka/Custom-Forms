import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../config";
import {
  type globalSearchType,
  type Statistics,
  type TemplateObject,
  type User,
} from "../../entities";

export const api = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: env.BACKEND_URL + "/v1/search",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    globalSearch: builder.query<{ data: globalSearchType }, string>({
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
  useLazyGlobalSearchQuery,
  useGetStatisticsQuery,
  useSearchTagsQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useLazySearchTempaltesQuery,
} = api;
