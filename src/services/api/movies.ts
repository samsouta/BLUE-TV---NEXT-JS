import { MovieDataType } from '@/src/types/MoviesType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type DataType = {
    data: MovieDataType[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

type RelatedDataType = {
    success: boolean;
    message:string;
    related_videos:MovieDataType[]
}

export const movies = createApi({
    reducerPath: "getMovies",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        // get feature video
        getMoviesFeature: builder.query<DataType, { page: number }>({
            query: ({ page }) => `featured-videos?page=${page || 1}`,
        }),

        // get recommendation videos
        getMoviesRecommendations: builder.query<DataType, { page: number }>({
            query: ({ page }) => `recommendations?page=${page}`,
        }),
        getGenre: builder.query<DataType, void>({
            query: () => `genres`,
        }),
        // get movies with genre
        getMoviesWithGrenre: builder.query<DataType, {genre: string, page: number  }>({
            query: ({ genre,page }) => `mov/by-subgenre?sub_genre=${genre}&page=${page}`,
        }),
        // get related movie
        getRelatedMovie: builder.query<RelatedDataType, number>({
            query: (id) => `movie/${id}/related`,
        }),

        // get new-release movie
        getNewReleaseMovie: builder.query<DataType, number>({
            query: (id) => `new-releases?page=${id}`,
        }),

         // get new-release movie
         getAllMovies: builder.query<DataType, number>({
            query: (id) => `movies?page=${id}`,
        }),

    })
})

export const {
    useGetMoviesFeatureQuery,
    useGetMoviesRecommendationsQuery,
    useGetMoviesWithGrenreQuery,
    useGetGenreQuery,
    useGetRelatedMovieQuery,
    useGetNewReleaseMovieQuery,
    useGetAllMoviesQuery
} = movies;
