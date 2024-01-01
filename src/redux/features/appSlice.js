import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    posts: [],
    isLoadingPosts: false,
    activeQueryFilters:{}
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
    setActiveQueryFilters: (state, action) => {
      state.activeQueryFilters = action.payload;
    },

  },
});

export const { setLoggedIn, setPosts, setIsLoadingPosts, setActiveQueryFilters } = appSlice.actions;

export default appSlice.reducer;
