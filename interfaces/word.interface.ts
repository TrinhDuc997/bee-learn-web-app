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
  _id: string;
  word: string;
  pronounce?: string;
  image?: string;
  example?: string;
  definition?: string;
  pronunciation?: string;
  audio?: string;
  pos?: string;
  translations?: ITranslation[];
  definitions?: IDefinition[];
  description: string;
  topics: string[];
}
export interface IWords extends Array<IWord> {}
