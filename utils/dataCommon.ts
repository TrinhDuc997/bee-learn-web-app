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
