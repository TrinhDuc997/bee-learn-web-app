import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const GOOGLE_API_KEY = "AIzaSyBIGuHNiagKekh-xsKaMZIN7wBkPcKxC8k";
const CUSTOM_SEARCH_ENGINE_ID = "3234a20bea5504169";

interface ImageData {
  title?: string;
  link?: string;
  image: {
    width: number;
    height: number;
  };
}

interface IPropsImageSearch {
  query?: string;
}
const ImageSearch = (props: IPropsImageSearch) => {
  const { query = "" } = props;
  const [images, setImages] = useState<ImageData[]>([]);

  const searchImages = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            key: GOOGLE_API_KEY,
            cx: CUSTOM_SEARCH_ENGINE_ID,
            q: query, // Replace this with your search query
            searchType: "image",
          },
        }
      );
      const imageData = response.data.items;
      setImages(imageData);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    if (!!query) {
      searchImages(query);
    }
  }, [query]);
  const [img] = images;
  return (
    <div>
      <Image
        layout="responsive"
        height={"100%"}
        width={"100%"}
        priority={true}
        src={img?.link || ""}
      />
    </div>
  );
};

export default ImageSearch;
