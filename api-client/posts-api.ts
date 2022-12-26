import { AxiosResponse } from "axios";
import { IPhoneticIPA } from "../models";
import axiosClient from "./general-api";

export const postsAPI = {
  getPhoneticData: function (
    req?: any,
    version = "v1"
  ): Promise<IPhoneticIPA[]> {
    return axiosClient.get(`/${version}/posts/getPhonetic`, req);
  },
};
