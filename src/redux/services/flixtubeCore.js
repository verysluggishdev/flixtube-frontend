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
    getPosts: builder.query({
      query: (urlParams) => {
        const {
          category,
          limit,
          skip,
          search,
          owner_id,
          sort_by_date
        } = urlParams;
    
        const queryParams = [
          category ? `category=${category}` : '',
          limit ? `limit=${limit}` : '',
          skip ? `skip=${skip}` : '',
          search ? `search=${search}` : '',
          owner_id ? `owner_id=${owner_id}` : '',
          sort_by_date ? `sort_by_date=${sort_by_date}` : ''
        ];
    
        const queryString = queryParams.filter(param => param !== '').join('&');
    
        return `/posts?${queryString}`;
      }
    }),

    getPost: builder.query({ query: (urlParams) => `/posts/${urlParams.postID}`}),
    
    getUser: builder.query({ query: (urlParams) => `/users/${urlParams.userID}`}),
    
    getUserPosts: builder.query({ query: (urlParams) => `/posts?owner_id=${urlParams.userID}`})
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useGetUserPostsQuery
} = flixtubeCoreApi;