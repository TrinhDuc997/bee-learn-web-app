import { ImageData } from "@interfaces";
import { createClient } from "pexels";

const client = createClient(process.env.PEXELS_KEY as string);

export const getPexelsImages = async (
  query: string,
  numberOfResults: number = 1
): Promise<ImageData[] | undefined> => {
  try {
    let dataPicture = (await client.photos
      .search({ query, per_page: numberOfResults })
      .then((photos) => {
        return photos;
      })) as any;
    return dataPicture?.photos || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return undefined;
  }
};
