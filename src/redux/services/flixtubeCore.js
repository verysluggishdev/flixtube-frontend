import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const flixtubeCoreApi = createApi({
  reducerPath: 'flixtubeCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({ query: (urlParams) => `/posts` }),
  }),
});

export const {
  useGetPostsQuery,
} = flixtubeCoreApi;