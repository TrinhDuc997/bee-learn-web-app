import axios from "axios";
import axiosClient from "./general-api";
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = "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";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const generateText = async (prompt: string) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  return response;
};

export const wordsAPI = {
  getSizeCollection: function (req: any, version = "v1"): Promise<number> {
    return axiosClient.get(`/${version}/common/getSizeCollection`, {
      params: req,
    });
  },
};
