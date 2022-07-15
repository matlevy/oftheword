import { Glyph } from "./Glyph";
//
export interface GlyphMap {
  getGlyph(search: string): Glyph;
  getFromIndex(index: number): Glyph;
  getBiGlyphIndex(a: Glyph, b: Glyph): number;
  getAllAsString(): string;
  getPresenterClass(glyph: Glyph): string;
}
