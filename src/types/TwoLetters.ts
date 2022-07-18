import { Letter } from "./Letter";

export interface TwoLetters {
  a?: Letter;
  b?: Letter;
}

export interface TwoLetterContainer {
  /** The source BiGlyph */
  BG: TwoLetters;
  /** The outer containing BiGlyph */
  IN: TwoLetters;
  //
  PR?: TwoLetterContainer;
}
