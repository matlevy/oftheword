import { Letter } from "./Letter";
import { LetterMap } from "./LetterMap";
import { WATERS } from "./wordActions/Waters";

export class LetterMapInLatin implements LetterMap {
  private static A: Array<string> = ["A", "B", "C", "D"];
  private static E: Array<string> = ["E", "F", "G", "H"];
  private static I: Array<string> = ["I", "J", "K", "L", "M", "N"];
  private static O: Array<string> = ["O", "P", "Q", "R", "S", "T"];
  private static U: Array<string> = ["U", "V", "W", "X", "Y", "Z"];

  private letters: Array<Letter> = [];

  private static ALPHABET: Array<string> = LetterMapInLatin.A.concat(
    LetterMapInLatin.E
  )
    .concat(LetterMapInLatin.I)
    .concat(LetterMapInLatin.O)
    .concat(LetterMapInLatin.U);

  constructor(public waters: WATERS) {
    this.letters = LetterMapInLatin.ALPHABET.map(
      (letter: string, index: number) => {
        return new Letter({
          R: this.waters,
          E: letter,
          T: index + 1,
          TT: this,
        });
      }
    );
  }

  public get start(): number {
    return 64;
  }

  /**
   * Searches for and returns a given Glyph
   * @param search the character to search for the corresponding letter
   * @returns the given letter
   */
  getLetter(search: string): Letter {
    const val = this.letters.find((current: Letter) => {
      return current.IN.E.toUpperCase() == search.toUpperCase();
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
  public getIndexOfTwoLetters(a: Letter, b: Letter): number {
    if (a.IN.T && b.IN.T) {
      return a.IN.T * 26 + b.IN.T - 26;
    }
    return 0;
  }
  //
  public getAllAsString(): string {
    return LetterMapInLatin.ALPHABET.filter((v: string) => {
      const letter: Letter = this.getLetter(v);
      if (letter.IN.R) return letter.IN.R.S(letter) > 0;
      return false;
    }).join("");
  }
  //
  public getPresenterClass(letter: Letter) {
    if (LetterMapInLatin.A.indexOf(letter.IN.E) != -1) {
      return "letter-a";
    }
    if (LetterMapInLatin.E.indexOf(letter.IN.E) != -1) {
      return "letter-e";
    }
    if (LetterMapInLatin.I.indexOf(letter.IN.E) != -1) {
      return "letter-i";
    }
    if (LetterMapInLatin.O.indexOf(letter.IN.E) != -1) {
      return "letter-o";
    }
    if (LetterMapInLatin.U.indexOf(letter.IN.E) != -1) {
      return "letter-u";
    }
    return "";
  }
  //
  public getLetterGroupPosition(letter: Letter): number {
    if (LetterMapInLatin.A.indexOf(letter.IN.E) != -1) {
      return LetterMapInLatin.A.indexOf(letter.IN.E) + 1;
    }
    if (LetterMapInLatin.E.indexOf(letter.IN.E) != -1) {
      return LetterMapInLatin.E.indexOf(letter.IN.E) + 1;
    }
    if (LetterMapInLatin.I.indexOf(letter.IN.E) != -1) {
      return LetterMapInLatin.I.indexOf(letter.IN.E) + 1;
    }
    if (LetterMapInLatin.O.indexOf(letter.IN.E) != -1) {
      return LetterMapInLatin.O.indexOf(letter.IN.E) + 1;
    }
    if (LetterMapInLatin.U.indexOf(letter.IN.E) != -1) {
      return LetterMapInLatin.U.indexOf(letter.IN.E) + 1;
    }
    return 0;
  }
}
