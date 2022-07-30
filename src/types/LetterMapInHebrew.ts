import { Letter } from "./Letter";
import { LetterMap } from "./LetterMap";
import { WATERS } from "./wordActions/Waters";

export class LetterMapInHebrew implements LetterMap {
  public rtl = true;

  private static A: Array<number> = [1488, 1489, 1490, 1491, 1492];
  private static V: Array<number> = [1493];
  private static Z: Array<number> = [1494, 1495, 1496, 1497, 1498, 1499];
  private static L: Array<number> = [1500, 1501, 1502, 1503, 1504, 1505, 1506];
  private static P: Array<number> = [1507, 1508];
  private static T: Array<number> = [1509, 1510, 1511, 1512, 1513, 1514];

  private letters: Array<Letter> = [];

  private static ALPHABET: Array<string> = LetterMapInHebrew.A.concat(
    LetterMapInHebrew.V
  )
    .concat(LetterMapInHebrew.Z)
    .concat(LetterMapInHebrew.L)
    .concat(LetterMapInHebrew.P)
    .concat(LetterMapInHebrew.T)
    .map((v: number) => String.fromCharCode(v));

  constructor(public waters: WATERS) {
    this.letters = LetterMapInHebrew.ALPHABET.map((E: string, T: number) => {
      return new Letter({
        R: this.waters,
        E,
        T: T + 1,
        TT: this,
      });
    });
  }

  public get start(): number {
    return 1487;
  }

  /**
   * Searches for and returns a given Letter
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
    return LetterMapInHebrew.ALPHABET.toString();
  }
  //
  public getPresenterClass(letter: Letter) {
    if (LetterMapInHebrew.A.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-a";
    }
    if (LetterMapInHebrew.Z.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-e";
    }
    if (LetterMapInHebrew.L.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-i";
    }
    if (LetterMapInHebrew.T.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-o";
    }
    if (LetterMapInHebrew.P.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-u";
    }
    if (LetterMapInHebrew.V.indexOf(letter.IN.E.charCodeAt(0)) != -1) {
      return "letter-u";
    }
    return "";
  }
  //
  public getLetterGroupPosition(letter: Letter): number {
    return 0;
  }
}
