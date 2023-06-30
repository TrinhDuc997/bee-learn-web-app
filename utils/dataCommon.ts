export interface POS {
  pos: string;
  title?: string;
}
export const dataPOS: POS[] = [
  { pos: "n", title: "Noun" },
  { pos: "v", title: "Verb" },
  { pos: "adj", title: "Adjective" },
  { pos: "adv", title: "Adverb" },
  { pos: "pron", title: "Pronoun" },
  { pos: "interj", title: "Interjection" },
  { pos: "det", title: "Determiner" },
  { pos: "num", title: "Numeral" },
  { pos: "part", title: "Particle" },
  { pos: "inf", title: "Infinitive" },
  { pos: "ger", title: "Gerund" },
  { pos: "phr", title: "Phrase" },
  { pos: "pro", title: "Proper Noun" },
  { pos: "prep", title: "Preposition" },
  { pos: "conj", title: "Conjunction" },
  { pos: "art", title: "Article" },
  { pos: "int", title: "Interrogative Word" },
];
export const dataPOSMap: { [key: string]: string } = {
  n: "Noun",
  v: "Verb",
  adj: "Adjective",
  adv: "Adverb",
  pron: "Pronoun",
  interj: "Interjection",
  det: "Determiner",
  num: "Numeral",
  part: "Particle",
  inf: "Infinitive",
  ger: "Gerund",
  phr: "Phrase",
  pro: "Proper Noun",
  prep: "Preposition",
  conj: "Conjunction",
  art: "Article",
  int: "Interrogative Word",
};
type PartOfSpeech = "Danh từ" | "Động từ" | "Tính từ" | "Trạng từ";

const partOfSpeechMap: { [key: string]: PartOfSpeech } = {
  n: "Danh từ",
  v: "Động từ",
  adj: "Tính từ",
  adv: "Trạng từ",
};
