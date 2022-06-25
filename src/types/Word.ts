import { Scripture } from "./Scripture";

export interface WordIn {
  scripture: Scripture;
  start: number;
  end: number;
}
export class Word {
  constructor(public IN: WordIn) {
    console.log(this.E, this.IN);
  }
  get E(): string {
    return this.IN.scripture.E.slice(this.IN.start, this.IN.end);
  }
}
