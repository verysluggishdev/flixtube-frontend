import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      
      state.loggedIn = action.payload;
    },

  },
});

export const { setLoggedIn } = appSlice.actions;

export default appSlice.reducer;
