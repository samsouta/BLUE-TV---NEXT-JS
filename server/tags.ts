// /server/tags.ts
import { MovieResponseType } from "@/src/types/MoviesType";

export type TagVideosResponse = {
  [tag: string]: MovieResponseType[];
};

export const fetchTags = async (): Promise<TagVideosResponse> => {
  try {
    const tags = ['tight pussy', 'creampie','Bondage','Cosplay', 'Big ass', 'Romantic'];
    const tagDataPromises = tags.map(async (tag) => {
      const res = await fetch(
        `https://bluetv.x10.mx/api/v1/mov/by-tag?tag=${encodeURIComponent(tag)}&page=1`
      );
      const data = await res.json();
      return {
        tag,
        videos: data?.data?.data || [],
      };
    });

    const tagDataArray = await Promise.all(tagDataPromises);
    const result: TagVideosResponse = {};
    tagDataArray.forEach((item) => {
      result[item.tag] = item.videos;
    });
    return result;
  } catch (error) {
    console.error('Tag data fetch wrong', error);
    return {};
  }
};
