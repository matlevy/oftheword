import { Letter } from "./Letter";
//
export interface LetterMap {
  start: number;
  getLetter(search: string): Letter;
  getFromIndex(index: number): Letter;
  getIndexOfTwoLetters(a: Letter, b: Letter): number;
  getAllAsString(): string;
  getPresenterClass(letter: Letter): string;
  getLetterGroupPosition(letter: Letter): number;
}
