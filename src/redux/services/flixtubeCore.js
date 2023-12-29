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
    getPost: builder.query({ query: (urlParams) => `/posts/${urlParams.postID}`}),
    getUser: builder.query({ query: (urlParams) => `/users/${urlParams.userID}`}),
    getUserPosts: builder.query({ query: (urlParams) => `/posts?owner_id=${urlParams.userID}`})
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useGetUserPostsQuery
} = flixtubeCoreApi;