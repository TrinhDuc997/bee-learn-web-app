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
export const generateDataWordFromAI = async (prompt: string) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return completion.data;
};

export const wordsAPI = {
  getSizeCollection: function (req: any, version = "v1"): Promise<number> {
    return axiosClient.get(`/${version}/common/getSizeCollection`, {
      params: req,
    });
  },
};
