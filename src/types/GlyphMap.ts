import { Glyph } from "./Glyph";
//
export interface GlyphMap {
  start: number;
  getGlyph(search: string): Glyph;
  getFromIndex(index: number): Glyph;
  getBiGlyphIndex(a: Glyph, b: Glyph): number;
  getAllAsString(): string;
  getPresenterClass(glyph: Glyph): string;
}
