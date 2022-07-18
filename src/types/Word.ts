import { Letter } from "./Letter";
import { Scripture } from "./Scripture";
import { Triplet, TripletIn } from "./Triplet";
import { God } from "./wordActions/God";
import { SPIRIT } from "./wordActions/Spirit";
import { TwoLetterContainer } from "./TwoLetters";
export interface WordIn {
  scripture: Scripture;
  start: number;
  end: number;
  GOD: God;
  map: boolean;
}
export class Word {
  public A: Array<Letter> = [];
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
        this.U.push(code - this.IN.GOD.G.start);
      }
      this.O[p] = this.U.indexOf(code - this.IN.GOD.G.start);
      //
      const letter: Letter = this.IN.GOD.IN.G.getFromIndex(this.U[this.O[p]]);
      this.A.push(letter);
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
            const input: TripletIn = {
              a: this.A[p],
              b: this.A[p + 1],
              c: this.A[p + 2],
              i: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ref: this.IN.scripture.IN.ref!,
                index,
              },
              GOD: this.IN.GOD,
              remap: true,
              scripture: this.IN.scripture,
            };
            this.IN.GOD.O.O.store<Triplet>(input).map(
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
  //
  get IT(): SPIRIT {
    return this.IN.GOD.GO.FACE({
      S: this.E,
      P: -1,
      T: {},
      I: [],
      IT: [],
      SCRIPTURE: this.IN.scripture,
    }) as SPIRIT;
  }
  //
  get BG(): TwoLetterContainer[] {
    return this.A.reduce(
      (p: TwoLetterContainer[], c: Letter, i: number, all: Letter[]) => {
        if (i > 0 && i < all.length - 2) {
          p.push({
            BG: {
              a: all[i],
              b: all[i + 1],
            },
            IN: {
              a: all[i - 1],
              b: all[i + 2],
            },
          });
        }
        return p;
      },
      []
    );
  }
}
