import { Chapter, ChapterSeed } from "./Chapter";
import { God } from "./wordActions/God";

export interface BookIn {
  GOD: God;
}
export interface BookSeed {
  book: number;
  chapters: Array<ChapterSeed>;
}
//
export class Book {
  public chapters: Array<Chapter> = [];
  public SEED!: BookSeed;

  constructor(public IN: BookIn) {}
  //
  public theearth(value: BookSeed) {
    this.SEED = value;
    this.read(value);
  }
  public read(value: BookSeed) {
    value.chapters.forEach((value: ChapterSeed, index: number) => {
      const chapter: Chapter = new Chapter({
        GOD: this.IN.GOD,
      }).theearth({
        chapter: index + 1,
        book: value.book,
        scripture: value.scripture,
      });
      this.chapters.push(chapter);
    });
    return this;
  }
}
