import { Word } from "./Word";

export class Sentence {
  private wordsAsStrings: string[] = [];
  private words: Word[] = [];
  //
  constructor(private source: string) {
    this.process();
  }
  private process() {
    // this.wordsAsStrings = this.source.split(/\s/gi);
    // this.wordsAsStrings.map((v: string) => {
    //   this.words.push(null);
    // });
  }
}
