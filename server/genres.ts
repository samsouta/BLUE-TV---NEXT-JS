// /server/tags.ts
import { MovieResponseType } from "@/src/types/MoviesType";

export type GenreVideosResponse = {
  [genre: string]: MovieResponseType[];
};

export const genres = async (): Promise<GenreVideosResponse> => {
  try {
    const genres = ['censored', 'Uncensored'];
    const genreDataPromises = genres.map(async (gen) => {
      const res = await fetch(
        `https://bluetv.x10.mx/api/v1/mov/by-subgenre?sub_genre=${gen}&page=1`
      );
      const data = await res.json();
      return {
        gen,
        videos: data?.data || [],
      };
    });

    const tagDataArray = await Promise.all(genreDataPromises);
    const result: GenreVideosResponse = {};
    tagDataArray.forEach((item) => {
      result[item.gen] = item.videos;
    });
    return result;
  } catch (error) {
    console.error('genre data fetch wrong', error);
    return {};
  }
};
