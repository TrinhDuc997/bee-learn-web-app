import { IExampleOfWord, IWordLeaned } from "./word.interface";

export interface ICourseLearned {
  course?: string;
  subject?: string;
  numberPacks?: number[];
}

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  token?: string;
  image?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  techLogin?: string;
  courseLearned?: ICourseLearned[];
  wordsLearned?: IWordLeaned[];
  hierarchicalArrayOfWords?: number[];
  tags?: ITag[];
}

export interface IUserRegistration {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  reInputPass?: string;
  fullName?: string;
}

export interface ITag {
  _id?: string;
  title?: string;
  description?: string;
}
