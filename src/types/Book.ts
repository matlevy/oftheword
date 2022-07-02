import { Chapter, ChapterSeed } from "./Chapter";
import { God } from "./wordActions/God";

export interface BookIn {
  GOD: God
}
export interface BookSeed {
  book: number;
  chapters: Array<ChapterSeed>
}
//
export class Book {
    constructor(public IN: BookIn) {}
    //
    public theearth(value: BookSeed) {
      this.read(value);
    }
    public read(value:BookSeed) {
      value.chapters.forEach((value: ChapterSeed, index: number) => {
        new Chapter({
          GOD: this.IN.GOD
        }).read({
          chapter: index + 1,
          book: value.book,
          scripture: value.scripture,
        })
      })
      return this;
    }
}