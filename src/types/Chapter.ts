import { Scripture, ScriptureIn } from "./Scripture";
import { God } from "./wordActions/God";

export interface ChapterIn {
  GOD: God;
}

export interface ChapterSeed {
  book: number;
  chapter: number;
  scripture: Array<string>;
}

export class Chapter {
  public scriptures: Array<Scripture> = [];
  constructor(public IN: ChapterIn) {}
  public theearth(value: ChapterSeed) {
    this.read(value);
  }
  //
  public read(value: ChapterSeed) {
    value.scripture.forEach((text: string, index: number) => {
      console.log(text);
      const scripture: Scripture = new Scripture({
        GOD: this.IN.GOD,
        map: true,
        ref: {
          book: value.book,
          chapter: value.chapter,
          verse: index + 1,
        },
        chapter: this,
      }).read(text.concat(" "));
      this.scriptures.push(scripture);
    });
    return this;
  }
}
