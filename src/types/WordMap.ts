import { Word } from "./Word";

export interface WordMapIn {
  map: Map<string, Word>;
}
export class WordMap {
  constructor(public IN: WordMapIn) {}
  map(key: string, value: Word) {
    this.IN.map.set(key, value);
  }
  get(key: string): Word {
    return this.IN.map.get(key) as Word;
  }
}
