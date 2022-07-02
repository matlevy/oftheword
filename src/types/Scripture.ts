import { thisExpression } from "@babel/types";
import { Chapter } from "./Chapter";
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
  ref?: ScriptureReference;
  map: boolean;
  prev?: string;
  chapter: Chapter;
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
            map: this.IN.map,
          }).WR as Word
        );
        lastWordStart = lE;
      } else if (code < 65 || code > 90) {
        // a character, therefore acts as a glyph decorator
      } else {
        this.E = this.E.concat(char);
      }
    }
    if (this.IN.map) {
      this.and();
    }
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
      if (wordA.A.length == 1) {
        const wordP = this.I[i - 1];
        if (wordP) {
          maps[0] = wordP.A[wordP.A.length - 1];
        } else {
          if (this.IN.chapter.scriptures[this.IN.ref!.verse - 2]) {
            const lastWordsOfPrevious =
              this.IN.chapter.scriptures[this.IN.ref!.verse - 2].I;
            const lastWordOfPrevious: Word =
              lastWordsOfPrevious[lastWordsOfPrevious.length - 1];
            maps[0] = lastWordOfPrevious.A[lastWordOfPrevious.A.length - 1];
          }
        }
      }
      if (wordB.A.length == 1) {
        const wordN = this.I[i + 2];
        maps[3] = wordN.A[0];
      }
      for (let p = 0; p < maps.length; p++) {
        if (maps[p + 2]) {
          const str =
            maps[p].character + maps[p + 1].character + maps[p + 2].character;
          this.IN.GOD.O.O.store<Triad>({
            a: maps[p],
            b: maps[p + 1],
            c: maps[p + 2],
            i: {
              ref: this.IN.ref!,
              index: this.E.indexOf(str),
            },
            GOD: this.IN.GOD,
            remap: true,
            scripture: this,
          }).map(this.IN, this.E.indexOf(str));
        }
      }
    }
    return this;
  }
  //
  get end() {
    return this.I.slice(this.I.length - 2, this.I.length - 1);
  }
  //
  create() {
    console.log("create");
  }
}
