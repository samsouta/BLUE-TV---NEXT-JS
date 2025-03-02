import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'js-cookie'; // Import js-cookie library

interface IncrementViewResponse {
    success: boolean;
    message: string;
    movieId: number;
    userId: number;
}

type Prop = {
    like_count: number
};

export const voting = createApi({
    reducerPath: "voting",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),

    endpoints: (builder) => ({
        /**
         * @get like count from video
         * 
         */
        getLikeCount: builder.query<Prop, number>({
            query: (id) => `/movie/${id}/like-count`,
        }),
        /**
         * @post like count to video
         */
        like: builder.mutation<IncrementViewResponse, number>({
            query: (videoId) => ({
                url: `/movie/${videoId}/like`,  // Change to the correct endpoint
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`,
                },
            }),
        }),

        /**
         * @post dislike count to video
         */
        unlike: builder.mutation<IncrementViewResponse, number>({
            query: (videoId) => ({
                url: `/movie/${videoId}/unlike`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookie.get('token')}`,
                },
            }),
        }),

    })
});

export const { useGetLikeCountQuery , useLikeMutation, useUnlikeMutation } = voting;
