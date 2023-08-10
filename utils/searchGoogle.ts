import { ImageData } from "@interfaces";
import axios from "axios";

export async function searchImages(
  query: string
): Promise<ImageData[] | undefined> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
          q: query, // Replace this with your search query
          searchType: "image",
        },
      }
    );
    const imageData = response.data.items;
    return imageData;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
