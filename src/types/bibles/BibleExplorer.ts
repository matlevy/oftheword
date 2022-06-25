export interface BibleSource {
  books: Array<BibleBook>;
}

export interface BibleBook {
  name: string,
  chapters: Array<BibleChapter>
}

export interface BibleChapter {
  chapter: number,
  scripture: Array<string>
}

export class BibleExplorer {
  constructor(public bible: BibleSource) {}
  //
  getBook(name: string): BibleBook | undefined {
    return this.bible.books.find((book:BibleBook) => book.name == name);
  }
  //
  getVerse(book: string, chapter: number, verse: number):string {
    return String(this.getBook(book)?.chapters[chapter-1].scripture[verse-1]);
  }
  //
  getVerseCount(book: string, chapter: number): number {
    if (this.getBook(book)?.chapters[chapter-1].scripture) {
      return Number(this.getBook(book)?.chapters[chapter-1].scripture.length)
    }
    return 0
  }
  //
  getChapterCount(book: string): number {
    if (this.getBook(book)?.chapters) {
      return Number(this.getBook(book)?.chapters.length)
    }
    return 0
  }
}
