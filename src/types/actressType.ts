import { MovieDataType } from "./MoviesType";

export interface ActressResponse {
    current_page: number;
    data: ActressType[];
    first_page_url: string;
    from: string;
    last_page: string;
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
    to: string;
    total: number;
}

export type ActressType = {
    id: number;
    name: string;
    description: string;
    image_url: string;
    age: number;
    nationality: string;
    birth_date: string;
    is_popular: boolean;
    movies_count: number;
    movies: MovieDataType[];
  };