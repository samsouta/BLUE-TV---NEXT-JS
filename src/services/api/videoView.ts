import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IncrementViewResponse {
  success: boolean;
  message: string;
}


export const videoView = createApi({
  reducerPath: 'view', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/v1/' }), 
  tagTypes: ['api'], 
  endpoints: (builder) => ({
    /**
     * @post increment view to video
     */
    incrementView: builder.mutation<IncrementViewResponse, { videoId: number }>({
      query: ({ videoId }) => ({
        url: `/movie/${videoId}/view`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useIncrementViewMutation } = videoView;
