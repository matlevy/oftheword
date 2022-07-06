import { GlyphMapLatin } from "./types/GlyphMapLatin";
import { GlyphMapSpecial } from "./types/GlyphMapSpecial";
import { Word } from "./types/Word";
import { God } from "./types/wordActions/God";
import { WordMap } from "./types/WordMap";
import { TriadMap } from "./types/TriadMap";
import {
  BibleExplorer,
  BibleBook,
  BibleChapter,
} from "./types/bibles/BibleExplorer";
import Bibles from "./types/bibles/Bibles";
import BibleBooksEnglish from "./types/bibles/BibleBooksEnglish";
import { Book } from "./types/Book";
import { Waters } from "./types/wordActions/Waters";

export class Root {
  private static _instance: Root;

  public RD: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });

  public triadMap: TriadMap;
  public O: God;
  public BIBLE: BibleExplorer = new BibleExplorer(Bibles.KING_JAMES);
  public gen!: Book;

  public static getInstance(): Root {
    if (!Root._instance) {
      Root._instance = new Root();
    }
    return Root._instance;
  }

  constructor() {
    this.triadMap = new TriadMap(GlyphMapLatin.getInstance());
    this.O = new God({
      G: GlyphMapLatin.getInstance(),
      O: this.triadMap,
      OD: this.RD,
      GO: new Waters(),
      X: GlyphMapSpecial.getInstance(),
    });
  }

  public init() {
    const book: BibleBook = this.BIBLE.getBook(
      BibleBooksEnglish.ENGLISH.GENESIS
    );

    this.gen = new Book({
      GOD: this.O,
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
