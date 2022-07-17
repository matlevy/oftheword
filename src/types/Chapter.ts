import { Scripture } from "./Scripture";
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
  public verse: Array<Scripture> = [];
  public SEED!: ChapterSeed;

  constructor(public IN: ChapterIn) {}

  public theearth(value: ChapterSeed): Chapter {
    this.SEED = value;
    this.read(value);
    return this;
  }
  //
  public read(value: ChapterSeed) {
    value.scripture.forEach((text: string, index: number) => {
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
      this.verse.push(scripture);
    });
    return this;
  }
}
