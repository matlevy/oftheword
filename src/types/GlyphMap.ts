import { Glyph } from "./Glyph";
//
export interface GlyphMap {
  getGlyph(search: string): Glyph;
  getFromIndex(index: number): Glyph;
}
