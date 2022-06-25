import { Word } from "./Word";

export interface WordMapIn {
  map: Map<string, Word>;
}
export class WordMap {
  constructor(public IN: WordMapIn) {}
}
