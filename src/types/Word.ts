import { Glyph } from "./Glyph";
import { Scripture } from "./Scripture";
import { God } from "./wordActions/God";
export interface WordIn {
  scripture: Scripture;
  start: number;
  end: number;
  GOD: God;
}
export class Word {
  public A: Array<Glyph> = [];
  public E = "";
  public O: Array<number> = [];
  public U: Array<number> = [];

  constructor(public IN: WordIn) {
    this.read();
    this.IN.GOD.ORD(this);
  }
  //
  public read() {
    this.E = this.R;
    this.A = [];
    this.U = [];
    //
    for (let p = 0; p < this.E.length; p++) {
      const code: number = this.E.charCodeAt(p);
      const char: string = this.E.charAt(p);
      if (this.E.indexOf(char) == p) {
        // a unique character, stored in unique character hash
        this.U.push(code - 64);
      }
      this.O[p] = this.U.indexOf(code - 64);
      //
      const glyph: Glyph = this.IN.GOD.IN.G.getFromIndex(this.U[this.O[p]]);
      this.A.push(glyph);
      if (p > 2) {
        // make a triad
        // const triadText: string = this.text.slice(p, p - 3);
      }
    }
  }
  get R(): string {
    return this.IN.scripture.E.slice(this.IN.start, this.IN.end);
  }
  get WR() {
    return this.IN.GOD.IN.OD.IN.map.get(
      this.IN.scripture.E.slice(this.IN.start, this.IN.end)
    );
  }
}
