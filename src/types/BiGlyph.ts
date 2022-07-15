import { Glyph } from "./Glyph";

export interface BiGlyph {
  a?: Glyph;
  b?: Glyph;
}

export interface BiglyphContainer {
  /** The source BiGlyph */
  BG: BiGlyph;
  /** The outer containing BiGlyph */
  IN: BiGlyph;
  //
  PR?: BiglyphContainer;
}
