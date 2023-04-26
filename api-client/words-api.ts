import { IPhoneticIPA, IVocabularySubjects, word } from "../interfaces";
import { IWord, IWords } from "../interfaces/word.interface";
import axiosClient from "./general-api";

export const wordsAPI = {
  addListWordFromExcel: function (req?: any, version = "v1"): Promise<word[]> {
    return axiosClient.post(`/${version}/words/addListWordFromExcel`, req);
  },
  updateListWords: function (req?: any, version = "v1"): Promise<IWord[]> {
    return axiosClient.put(`/${version}/words/updateListWord`, req);
  },
  getListVocabularySubjects: function (
    req?: any,
    version = "v1"
  ): Promise<IVocabularySubjects[]> {
    return axiosClient.get(`/${version}/words/getListVocabularySubjects`, {
      params: req,
    });
  },
  getListVocabulary: function (req?: any, version = "v1"): Promise<IWords> {
    return axiosClient.get(`/${version}/words/getListWords`, { params: req });
  },
  getSizeCollection: function (req?: any, version = "v1"): Promise<number> {
    return axiosClient.get(`/${version}/words/getSizeCollection`, {
      params: req,
    });
  },
  getDetailWord: function (req?: any, version = "v1"): Promise<IWords> {
    return axiosClient.get(`/${version}/words/getDetailWord`, { params: req });
  },
};
