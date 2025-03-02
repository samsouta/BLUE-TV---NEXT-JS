// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { genres } from './services/api/genres';
import { actress } from './services/api/actress';
import { VideoSlice } from './services/slice/VideoSlice';
import { movies } from './services/api/movies';
import { voting } from './services/api/voting';

export const store = configureStore({
  reducer: {
    /**
     * @callback api reducer
     */
    [genres.reducerPath]: genres.reducer,
    [actress.reducerPath]: actress.reducer,
    [movies.reducerPath]: movies.reducer,
    [voting.reducerPath]: voting.reducer,

    /**
     * @callback slice reducer
     */
    video:VideoSlice.reducer,
  },

  /**
   * Adding the api middleware enables caching, invalidation, polling,
   * @param getDefaultMiddleware 
   * @returns 
   * and other useful features of `rtk-query`.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      genres.middleware,
      actress.middleware,
      movies.middleware,
      voting.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
