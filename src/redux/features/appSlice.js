import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    posts: []
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

  },
});

export const { setLoggedIn, setPosts } = appSlice.actions;

export default appSlice.reducer;
