import { Glyph } from "./Glyph";
import { Triad } from "./Triad";
import { Word } from "./Word";
import { God } from "./wordActions/God";
export interface ScriptureReference {
  book: number;
  chapter: number;
  verse: number;
}
export interface ScriptureIn {
  GOD: God;
  ref: ScriptureReference;
}

export class Scripture {
  public A: Array<number> = [];
  public E = "";
  public I: Array<Word> = [];
  public O: Array<number> = [];
  public U: Array<number> = [];
  //
  private text = "";
  //
  constructor(public IN: ScriptureIn) {}
  //
  god() {
    console.log("god");
  }
  theearth(value: string) {
    this.read(value);
  }
  //
  read(value: string) {
    this.text = value.toLocaleUpperCase();
    this.A = [];
    this.E = "";
    this.I = [];
    this.O = [];
    this.U = [];
    //
    let lastWordStart = 0;
    //
    for (let p = 0; p < this.text.length; p++) {
      const code: number = this.text.charCodeAt(p);
      const char: string = this.text.charAt(p);
      const lE: number = this.E.length;
      if (code == 32) {
        // a space, signifies new word
        this.I.push(
          new Word({
            start: lastWordStart,
            end: lE,
            scripture: this,
            GOD: this.IN.GOD,
          }).WR as Word
        );
        lastWordStart = lE;
      } else if (code < 65 || code > 90) {
        // a character, therefore acts as a glyph decorator
      } else {
        this.E = this.E.concat(char);
      }
    }
    this.and();
    return this;
  }
  //
  and() {
    for (let i = 0; i < this.I.length - 1; i++) {
      const wordA: Word = this.I[i];
      const wordB: Word = this.I[i + 1];
      const maps: Array<Glyph> = [
        wordA.A[wordA.A.length - 2],
        wordA.A[wordA.A.length - 1],
        wordB.A[0],
        wordB.A[1],
      ];
      for (let p = 0; p < maps.length; p++) {
        if (maps[p + 2]) {
          new Triad({
            a: maps[p],
            b: maps[p + 1],
            c: maps[p + 2],
            i: 0,
            GOD: this.IN.GOD,
            remap: true,
            scripture: this,
          });
        }
      }
      console.log();
    }
    console.log(this);
    return this;
  }
  //
  create() {
    console.log("create");
  }
}
