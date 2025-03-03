import { PaginatedMovieResponse } from "@/src/types/MoviesType";

export const randomVideo = async (): Promise<PaginatedMovieResponse | null> => {
  try {
    const res = await fetch(`https://bluetv.x10.mx/api/v1/movies`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
   
    return data;
    
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Ensure a consistent return type
  }
};
