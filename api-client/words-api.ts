import { IPhoneticIPA, IUser, IVocabularySubjects, word } from "../interfaces";
import { IWord, IWordLeaned, IWords } from "../interfaces/word.interface";
import axiosClient from "./general-api";

interface IResImportWordsUserLearned {
  wordsLearned: IWordLeaned[];
  hierarchicalArrayOfWords: number[];
}

export const wordsAPI = {
  mockUpAPI: (req: any) => {
    console.log("🚀 ~ file: words-api.ts:68 ~ export  wordsAPI.req:", req);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 2000);
    });
  },
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
  updateVocabularySubjects: function (
    req?: any,
    version = "v1"
  ): Promise<IVocabularySubjects[]> {
    return axiosClient.put(`/${version}/words/updateVocabularySubjects`, req);
  },
  updateWordsUserLearned: function (req?: any, version = "v1"): Promise<IUser> {
    return axiosClient.put(`/${version}/words/updateWordsUserLearned`, req);
  },
  importWordsUserLearned: function (
    req?: any,
    version = "v1"
  ): Promise<IResImportWordsUserLearned> {
    return axiosClient.put(`/${version}/words/importWordsUserLearned`, req);
  },

  getListWordsToReview: function (req?: any, version = "v1"): Promise<IWords> {
    return axiosClient.get(`/${version}/words/getListWordsToReview`, {
      params: req,
    });
  },
};
