export type SubGenreDataType = {
    genre_id: number;
    id: number;
    name: string;
}

export type GenreDataType = {
    description: string;
    id: number;
    name: string;
    sub_genres: SubGenreDataType[]
}