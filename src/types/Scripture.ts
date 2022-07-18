/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Chapter } from "./Chapter";
import { Letter } from "./Letter";
import { Triplet } from "./Triplet";
import { TripletMappingDirection } from "./TripletMappingDirection";
import { Word } from "./Word";
import { God } from "./wordActions/God";
export interface ScriptureReference {
  book: number;
  chapter: number;
  verse: number;
  P?: number;
  T?: number;
}
export interface ScriptureIn {
  GOD: God;
  ref?: ScriptureReference;
  map: boolean;
  prev?: string;
  chapter?: Chapter;
}

export interface ScriptureTORU {
  T: Letter;
  O: Letter;
  R: Letter;
  U: Letter;
}

export interface ScriptureTORUs {
  T: string;
  O: string;
  R: string;
  U: string;
}
export class Scripture {
  public TO: TripletMappingDirection = TripletMappingDirection.BAC;
  public UT: TripletMappingDirection = TripletMappingDirection.CAB;
  public RO: TripletMappingDirection = TripletMappingDirection.ACB;
  public A: Array<Letter> = [];
  public E = "";
  public I: Array<Word> = [];
  public O: Array<number> = [];
  public U: Array<number> = [];
  public X: Array<Letter> = [];
  public P = -1;
  //
  public text = "";
  //
  constructor(public IN: ScriptureIn) {}
  //
  public get T(): Array<ScriptureTORU> {
    return this.A.map((v: Letter): ScriptureTORU => {
      return {
        O: v.MAP(this.TO)[0].c!,
        R: v.MAP(this.RO)[0].b!,
        T: v.MAP(this.TO)[0].b!,
        U: v.MAP(this.UT)[0].b!,
      };
    });
  }
  public get IT(): ScriptureTORUs {
    return this.T.reduce(
      (p: ScriptureTORUs, v: ScriptureTORU) => {
        p.T = p.O.concat(v.T.IN.E);
        p.O = p.O.concat(v.O.IN.E);
        p.R = p.R.concat(v.R.IN.E);
        p.U = p.U.concat(v.U.IN.E);
        return p;
      },
      {
        T: "",
        O: "",
        R: "",
        U: "",
      }
    );
  }
  //
  god() {
    console.log("god");
  }
  theearth(value: string) {
    this.read(value);
    return this;
  }
  //
  read(value: string) {
    this.text = value.toLocaleUpperCase();
    this.A = [];
    this.E = "";
    this.I = [];
    this.O = [];
    this.U = [];
    this.X = [];
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
        // a character, therefore acts as a letter decorator
        if (this.IN.GOD.IN.X.getLetter(char).IN.E != "*") {
          this.X[this.I.length] = this.IN.GOD.IN.X.getLetter(char);
        }
      } else {
        this.E = this.E.concat(char);
        this.A = this.A.concat(
          this.IN.GOD.IN.G.getFromIndex(code - this.IN.GOD.G.start)
        );
        // a unique character, stored in unique character hash
        this.U.push(code - this.IN.GOD.G.start);
        if (this.O.indexOf(code - this.IN.GOD.G.start) == -1) {
          this.O.push(code - this.IN.GOD.G.start);
        }
      }
    }
    if (this.IN.map) {
      if (this.IN.GOD.IN.GO) {
        this.IN.GOD.IN.GO!.ACE(this.E, this);
      }
      this.and();
    }
    return this;
  }
  //
  and() {
    const words: Array<Word> = [];
    if (this.IN.chapter) {
      if (this.IN.chapter.verse[this.IN.ref!.verse - 2]) {
        const lastWordsOfPrevious =
          this.IN.chapter.verse[this.IN.ref!.verse - 2].I;
        const lastWordOfPrevious: Word =
          lastWordsOfPrevious[lastWordsOfPrevious.length - 1];
        if (lastWordOfPrevious.A.length == 1) {
          words.push(lastWordsOfPrevious[lastWordsOfPrevious.length - 2]);
          console.warn("had to get previous but one word... ");
        }
        words.push(lastWordOfPrevious);
      }
    }
    words.push(...this.I);
    for (let i = 0; i < words.length - 1; i++) {
      const wordA: Word = words[i];
      const wordB: Word = words[i + 1];
      const maps: Array<Letter> = [
        wordA.A[wordA.A.length - 2],
        wordA.A[wordA.A.length - 1],
        wordB.A[0],
        wordB.A[1],
      ];
      if (wordA.A.length == 1) {
        const wordP = words[i - 1];
        maps[0] = wordP.A[wordP.A.length - 1];
      }
      if (wordB.A.length == 1 && words[i + 2]) {
        const wordN = words[i + 2];
        maps[3] = wordN.A[0];
      }
      for (let p = 0; p < maps.length; p++) {
        if (maps[p + 2]) {
          const str = maps[p].IN.E + maps[p + 1].IN.E + maps[p + 2].IN.E;
          this.IN.GOD.O.O.store<Triplet>({
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
