interface ITranslation {
  lang: string;
  trans: string;
}
interface IExample {
  example?: string;
  meaning?: string;
}
interface IDefinition {
  type?: string;
  meaning?: string;
  examples?: IExample[];
}
export interface IWord {
  _id?: string;
  word?: string;
  pronounce?: string;
  image?: string;
  example?: string;
  definition?: string;
  pronunciation?: string;
  audio?: string;
  pos?: string;
  translations?: ITranslation[];
  definitions?: IDefinition[];
  description?: string;
  topics?: string[];
}
export type PartOfSpeech = "Danh từ" | "Động từ" | "Tính từ" | "Trạng từ";
export const partOfSpeechMap: { [key: string]: PartOfSpeech } = {
  n: "Danh từ",
  v: "Động từ",
  adj: "Tính từ",
  adv: "Trạng từ",
};
export interface IWords extends Array<IWord> {}

export interface IWordLeaned {
  word: string;
  numberOfReview: number;
  numberOfReviewCorrect: number;
  lastTimeReview?: number;
}
