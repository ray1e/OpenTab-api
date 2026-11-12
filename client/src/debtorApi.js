import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const debtorApi = createApi({
  reducerPath: "debtorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/debtors",
  }),
  endpoints: (build) => ({
    getDebtors: build.query({
      query: () => ({ url: "?include=tabs" }),
      transformResponse: (response) => response.data,
      //tag the whole list and individual items
      providesTags: (result) => [
        { type: "debtors", id: "LIST" },
        ...result.debtorProfiles.map(({ _id }) => ({ type: "debtors", id: _id })),
      ],
    }),
    getAllDebtorsList: build.query({
      query: (pageNumber) => ({ url: `?include=tabs&page=${pageNumber}` }),
      transformResponse: (response) => response.data,
      //tag the whole list and individual items
      providesTags: (result) => [
        { type: "debtors", id: "LIST" },
        ...result.debtorProfiles.map(({ _id }) => ({ type: "debtors", id: _id })),
      ],
    }),
  }),
});

export const { useGetDebtorsQuery, useGetAllDebtorsListQuery } = debtorApi;
