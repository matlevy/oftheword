import { WordMap } from "./WordMap";
import { Word } from "./Word";
import { Glyph } from "./Glyph";

export class Scripture {
  private current: Word;

  public words: Array<Word> = [];

  constructor(public wordMap: WordMap) {
    this.current = this.create();
  }
  //
  god(): Array<Glyph | undefined> | undefined {
    return this.words.reduce(
      (prev: Array<Glyph | undefined>, current: Word) =>
        prev.concat(current.output),
      []
    );
  }
  theearth() {
    
  }
  //
  read(value: string) {
    if (value === " ") {
      if (!this.wordMap.god(value.replace(" ", ""))) {
        this.currentWord.update(value.replace(" ", ""));
        this.and().create();
      } else {
        this.current = this.wordMap.god(value.replace(" ", ""));
        this.and().create();
      }
    } 
  }
  //
  and() {
    this.wordMap.read(this.currentWord);
    this.words.push(this.currentWord);
    return this;
  }
  //
  create(): Word {
    return this.wordMap.create();
  }
  //
  get currentWord(): Word {
    if (this.current == undefined) {
      this.current = this.create();
    }
    return this.current;
  }
}
