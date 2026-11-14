import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tabApi = createApi({
  reducerPath: "tabApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/tabs",
  }),
  endpoints: (builder) => ({
    getActiveTabsCount: builder.query({
      query: () => ({ url: "/unpaid-debts" }),
      transformResponse: (response) => response.data,
      providesTags: () => [{ type: "tabs", id: "COUNT" }],
    }),
  }),
});

export const { useGetActiveTabsCountQuery } = tabApi;
