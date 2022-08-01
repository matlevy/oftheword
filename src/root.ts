import { LetterMapInLatin } from "./types/LetterMapInLatin";
import { LetterMapInHebrew } from "./types/LetterMapInHebrew";
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
import { BOOK_LIST } from "./types/bibles/BibleBooks";
import { Book } from "./types/Book";
import { WATERS, Waters } from "./types/wordActions/Waters";
import { LetterMap } from "./types/LetterMap";
//
import BOOKS from "./types/bibles/BibleBooks";

export interface RootIn {
  T: WATERS;
  O: God;
}

export interface RootSource {
  source: BibleSource;
  books: BOOK_LIST;
  root: RootIn;
}

export interface Source {
  name: string;
  rootSource: RootSource;
  books?: Book[];
  explorer?: BibleExplorer;
}

export class RootFactory {
  private static _instance: RootFactory;
  //
  public static getInstance(): RootFactory {
    RootFactory._instance = new RootFactory();
    return this._instance;
  }
  //
  public constructAllSources(): Source[] {
    return this.prepareAll().map((v: Source) => {
      const explorer: BibleExplorer = new BibleExplorer(v.rootSource.source);
      const books: string[] = Object.keys(v.rootSource.books);
      v.books = this.constructBooks(v.rootSource.root.O, [books[0]], explorer);
      v.explorer = explorer;
      return v;
    });
  }
  //
  public prepareAll(): Source[] {
    return [
      {
        name: SOURCES.KJV,
        rootSource: this.openKJV(),
      },
      {
        name: SOURCES.TORAH,
        rootSource: this.openTorah(),
      },
      {
        name: SOURCES.VULGATE,
        rootSource: this.openVulgate(),
      },
    ];
  }
  //
  public openKJV(): RootSource {
    return {
      source: Bibles.KING_JAMES,
      books: BOOKS["ENGLISH"],
      root: this.createLatin(),
    };
  }
  //
  public openTorah(): RootSource {
    return {
      source: Bibles.TORAH,
      books: BOOKS["ENGLISH"],
      root: this.createHebrew(),
    };
  }
  //
  public openVulgate(): RootSource {
    return {
      source: Bibles.VULGATE,
      books: BOOKS["LATIN"],
      root: this.createLatin(),
    };
  }
  //
  public createHebrew(): RootIn {
    const W: WATERS = this.createWaters();
    const G: LetterMap = new LetterMapInHebrew(W);
    return this.createRootIn(G, new TripletMap(G), W);
  }
  //
  public createLatin(): RootIn {
    const W: WATERS = this.createWaters();
    const G: LetterMap = new LetterMapInLatin(W);
    return this.createRootIn(G, new TripletMap(G), W);
  }
  //
  public createWaters(): WATERS {
    return new Waters();
  }
  //
  public createTipletMap(G: LetterMap): TripletMap {
    return new TripletMap(G);
  }
  //
  public createWordMap(): WordMap {
    return new WordMap({
      map: new Map<string, Word>(),
    });
  }
  //
  public createRootIn(G: LetterMap, O: TripletMap, GO: WATERS): RootIn {
    const OD: WordMap = new WordMap({
      map: new Map<string, Word>(),
    });
    return {
      O: new God({
        G,
        O,
        OD,
        GO,
        X: SpecialLetterMap.getInstance(),
      }),
      T: GO,
    };
  }
  //
  public constructBooks(
    GOD: God,
    input: string[],
    explorer: BibleExplorer
  ): Book[] {
    return input
      .map((book: string) => explorer.getBook(book))
      .map((book: BibleBook, index: number) => {
        return new Book({ GOD }).read({
          book: index + 1,
          chapters: book.chapters.map((v: BibleChapter, index: number) => {
            return {
              book: index + 1,
              chapter: index + 1,
              scripture: v.scripture,
            };
          }),
        });
      });
  }
}

export class SOURCES {
  static KJV = "KJV";
  static TORAH = "TORAH";
  static VULGATE = "VULGATE";
}

export class Root {
  private static _instance: Root;

  public sources: Source[];
  public currentSource?: Source;

  public static getInstance(): Root {
    if (!Root._instance) {
      this._instance = new Root();
    }
    return Root._instance;
  }

  constructor() {
    this.sources = RootFactory.getInstance().constructAllSources();
  }

  init() {
    this.setSourceByName(SOURCES.KJV);
  }

  public setSourceByName(name: string) {
    const selectedSource: Source | undefined = this.sources.find(
      (source: Source) => source.name == name
    );
    if (selectedSource) {
      this.currentSource = selectedSource;
    }
  }

  public get EXPLORER(): BibleExplorer | undefined {
    return this.currentSource?.explorer;
  }

  public get IN(): RootIn {
    return this.currentSource?.rootSource.root as RootIn;
  }

  public get gen(): Book | undefined {
    const books: Book[] | undefined = this.currentSource?.books;
    return books != undefined ? books.find((v, i) => i == 0) : undefined;
  }

  public get letterMap(): TripletMap {
    return this.IN.O.O;
  }

  public get source(): BibleSource {
    return this.currentSource?.rootSource.source as BibleSource;
  }

  public get bookList(): BOOK_LIST {
    return this.currentSource?.rootSource.books as BOOK_LIST;
  }

  public getBookName(index: number) {
    const books: string[] = Object.keys(
      this.currentSource?.rootSource.books as BOOK_LIST
    );
    return books[index];
  }
}
