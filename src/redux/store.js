import { configureStore } from '@reduxjs/toolkit';

// import playerReducer from './features/playerSlice';
import appReducer from './features/appSlice';
import { flixtubeCoreApi } from './services/flixtubeCore';


export const store = configureStore({
  reducer: {
    [flixtubeCoreApi.reducerPath]: flixtubeCoreApi.reducer,
    app: appReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flixtubeCoreApi.middleware)
});
