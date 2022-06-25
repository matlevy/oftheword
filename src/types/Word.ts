import { Scripture } from "./Scripture";
import { God } from "./wordActions/God";
export interface WordIn {
  scripture: Scripture;
  start: number;
  end: number;
  GOD: God;
}
export class Word {
  constructor(public IN: WordIn) {
    console.log(this.R, this.IN);
    this.IN.GOD.ORD(this);
  }
  get R(): string {
    return this.IN.scripture.E.slice(this.IN.start, this.IN.end);
  }
  get WR() {
    return this.IN.GOD.IN.O.D.IN.map.get(
      this.IN.scripture.E.slice(this.IN.start, this.IN.end)
    );
  }
}
