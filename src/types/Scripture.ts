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
  public I: Array<Word> = [];
  public E = "";
  //
  private text = "";
  private A: Array<number> = [];
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
    this.E = "";
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
    // extract glyphs
    for (let p = 0; p < this.text.length; p++) {
      const code: number = this.text.charCodeAt(p);
      const char: string = this.text.charAt(p);
      if (code < 65 || code > 90) {
        // a character, therefore acts as a glyph decorator
      }
      if (this.text.indexOf(char) == p) {
        // a unique character for the string, and is stored in
      }
      if (p > 2) {
        // make a triad
        const triadText: string = this.text.slice(p, p - 3);
      }
    }
    //this.god();
    return this;
  }
  //
  create() {
    console.log("create");
  }
}
