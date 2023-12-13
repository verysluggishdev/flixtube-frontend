import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const flixtubeCoreApi = createApi({
  reducerPath: 'flixtubeCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5000/api',
    // prepareHeaders: (headers) => {
    //   headers.set('Authorization', 'Bearer BQDYQZM-94NLe5uSWH1aipuUsGDL36yOMpUusuGCb2jQcLW49SXihdK03Dt0NKxxSJbE_MkJcBA5if1VwUfknIluqe5aZI5f27Hb8wgOOGja83DTbTg');

    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getCartegories: builder.query({ query: (urlParams) => `v1/browse/categories` }),
  }),
});

export const {
  useGetCartegoriesQuery,
} = flixtubeCoreApi;