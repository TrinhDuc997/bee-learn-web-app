import axiosClient from "./general-api";

export const wordsAPI = {
  getSizeCollection: function (req: any, version = "v1"): Promise<number> {
    return axiosClient.get(`/${version}/common/getSizeCollection`, {
      params: req,
    });
  },
};
