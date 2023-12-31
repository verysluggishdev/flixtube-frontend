import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    posts: [],
    isLoadingPosts: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      
      state.loggedIn = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setIsLoadingPosts: (state, action) => {
      state.isLoadingPosts = action.payload;
    },

  },
});

export const { setLoggedIn, setPosts, setIsLoadingPosts } = appSlice.actions;

export default appSlice.reducer;
