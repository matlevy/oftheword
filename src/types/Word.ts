import { Cognate } from "./Cognate";
import { Glyph } from "./Glyph";
import { Scripture } from "./Scripture";
import { Reference, ReferencePoint } from "./SourceMap";
import { Triad, TriadIn } from "./Triad";
import { God } from "./wordActions/God";
export interface WordIn {
  scripture: Scripture;
  start: number;
  end: number;
  GOD: God;
  map: boolean;
}
export class Word {
  public A: Array<Glyph> = [];
  public E = "";
  public O: Array<number> = [];
  public U: Array<number> = [];

  constructor(public IN: WordIn) {
    this.read().and();
    this.IN.GOD.ORD(this);
  }
  //
  public read(): Word {
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
    }
    return this;
  }
  //
  public and() {
    if (this.IN.map) {
      if (this.R.length > 2) {
        for (let p = 0; p < this.E.length; p++) {
          if (this.A[p + 2]) {
            const index = this.IN.scripture.E.indexOf(this.R);
            const input: TriadIn = {
              a: this.A[p],
              b: this.A[p + 1],
              c: this.A[p + 2],
              i: {
                ref: this.IN.scripture.IN.ref!,
                index,
              },
              GOD: this.IN.GOD,
              remap: true,
              scripture: this.IN.scripture,
            };
            this.IN.GOD.O.O.store<Triad>(input).map(
              this.IN.scripture.IN,
              index
            );
          }
        }
      }
    }
  }
  //
  get R(): string {
    return this.IN.scripture.E.slice(this.IN.start, this.IN.end);
  }
  get WR() {
    return this.IN.GOD.IN.OD.IN.map.get(
      this.IN.scripture.E.slice(this.IN.start, this.IN.end)
    );
  }
}
