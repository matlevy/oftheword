import { LetterMapInLatin } from "./types/LetterMapInLatin";
import { SpecialLetterMap } from "./types/SpecialLetterMap";
import { Word } from "./types/Word";
import { God } from "./types/wordActions/God";
import { WordMap } from "./types/WordMap";
import { TripletMap } from "@/types/TripletMap";
import {
  BibleExplorer,
  BibleBook,
  BibleChapter,
  BibleSource,
} from "./types/bibles/BibleExplorer";
import Bibles from "./types/bibles/Bibles";
import BibleBooksEnglish, { BOOK_LIST } from "./types/bibles/BibleBooks";
import { Book } from "./types/Book";
import { WATERS, Waters } from "./types/wordActions/Waters";
import { LetterMap } from "./types/LetterMap";
import BOOKS from "./types/bibles/BibleBooks";

export interface RootIn {
  T: WATERS;
  O: God;
}
export class Root {
  private static _instance: Root;

  public BIBLE: BibleExplorer = new BibleExplorer(this.source);
  public gen!: Book;

  public static getInstance(): Root {
    if (!Root._instance) {
      const GO: WATERS = new Waters();
      const G: LetterMap = new LetterMapInLatin(GO);
      const O: TripletMap = new TripletMap(G);
      const OD: WordMap = new WordMap({
        map: new Map<string, Word>(),
      });
      Root._instance = new Root({
        O: new God({
          G,
          O,
          OD,
          GO,
          X: SpecialLetterMap.getInstance(),
        }),
        T: GO,
      });
    }
    return Root._instance;
  }

  constructor(public IN: RootIn) {}

  public get letterMap(): TripletMap {
    return this.IN.O.O;
  }

  public get source(): BibleSource {
    return Bibles.VULGATE;
  }

  public get books(): BOOK_LIST {
    return BOOKS["LATIN"];
  }

  public init() {
    const book: BibleBook = this.BIBLE.getBook(this.books.GENESIS);

    this.gen = new Book({
      GOD: this.IN.O,
    }).read({
      book: 1,
      chapters: book.chapters.map((v: BibleChapter, index: number) => {
        return {
          book: 1,
          chapter: index + 1,
          scripture: v.scripture,
        };
      }),
    });
  }
}
