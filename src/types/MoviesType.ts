import { ActressType } from "./actressType";

export type MovieDataType = {
    id: number;
    title: string;
    description: string;
    posted_date: string;
    duration: number;
    view_count: number;
    rating_total: number;
    rating_count: number;
    genre_id: number;
    sub_genre_id: number;
    language: string;
    released_year: string;
    thumbnail_url: string;
    video_url: string;
    is_featured: number;
    tags: {
        id: number;
        name: string;
    }[];
    genre: {
        id: number;
        name: string;
        description: string;
    };
    sub_genre: {
        id: number;
        genre_id: number;
        name: string;
    };
    actresses: ActressType[];
};


export type DataResponseType<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

// Changed this type to match the API response structure
export type MovieResponseType = MovieDataType;

// Added this type for paginated movie responses
export type PaginatedMovieResponse = DataResponseType<MovieDataType>;