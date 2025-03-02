import { GenreDataType } from '@/src/types/genreType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface GenresResponse {
    status: string;
    data: GenreDataType[];
}


export const genres = createApi({
    reducerPath : "genre",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        // get all genre data
        getAllgenre: builder.query<GenresResponse, void>({
            query: () => 'genres',
        }),
        /*** ************* */


    })

})

export const {useGetAllgenreQuery} = genres;