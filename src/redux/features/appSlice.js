import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: 'app data'
};

const appSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setAppData: (state, action) => {
      
      state.data = action.payload;
    },
  },
});

export const { setAppData } = appSlice.actions;

export default appSlice.reducer;
