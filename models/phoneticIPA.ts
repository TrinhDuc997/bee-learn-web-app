export interface IPhoneticIPA {
  _id: string;
  character: string;
  urlSoundIPA?: string;
  nameIconSoundIPA?: string;
  exampleWords?: word[];
  exampleWord?: string;
  pronunciationGuide?: string;
  vowels?: boolean;
  consonants?: boolean;
  Diphthongs?: boolean;
  Monophthongs?: boolean;
  ordinalNumber: number;
}
export interface word {
  word: string;
  phonetic?: string;
}
