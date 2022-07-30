import { Letter } from "./Letter";
import { LetterMap } from "./LetterMap";

export class SpecialLetterMap implements LetterMap {
  public rtl = false;
  //
  private static _instance: SpecialLetterMap;

  private static A: Array<string> = [";", ",", ":", "."];
  private static B: Array<string> = ["-", "?", " "];

  // TODO: Brackets

  private letters: Array<Letter> = [];

  private static SPECIAL: Array<string> = SpecialLetterMap.A.concat(
    SpecialLetterMap.B
  );

  public static getInstance(): SpecialLetterMap {
    if (!SpecialLetterMap._instance) {
      SpecialLetterMap._instance = new SpecialLetterMap();
    }
    return SpecialLetterMap._instance;
  }

  constructor() {
    this.letters = SpecialLetterMap.SPECIAL.map((E: string, T: number) => {
      return new Letter({
        E,
        T,
        TT: this,
      });
    });
  }

  public get start(): number {
    return -1;
  }

  /**
   * Searches for and returns a given Glyph
   * @param search the character to search for the corresponding letter
   * @returns the given letter
   */
  getLetter(search: string): Letter {
    const val = this.letters.find((current: Letter) => {
      return current.IN.E == search;
    });
    return val
      ? val
      : new Letter({
          E: "*",
          T: 0,
          TT: this,
        }); // TODO: Warn on empty
  }
  //
  getFromIndex(index: number): Letter {
    return this.letters[index - 1];
  }
  //
  public getIndexOfTwoLetters(a: Letter, b: Letter) {
    if (a.IN.T && b.IN.T) {
      return a.IN.T * 26 + b.IN.T - 26;
    }
    return 0;
  }
  //
  public getAllAsString(): string {
    return SpecialLetterMap.SPECIAL.toString();
  }
  //
  public getPresenterClass(letter: Letter): string {
    return "";
  }
  //
  public getLetterGroupPosition(letter: Letter): number {
    return 0;
  }
}
