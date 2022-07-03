import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";

export class GlyphMapSpecial implements GlyphMap {
  private static _instance: GlyphMapSpecial;

  private static A: Array<string> = [";", ",", ":", "."];
  private static B: Array<string> = ["-", "?"];

  // TODO: Brackets

  private glyphs: Array<Glyph> = [];

  private static SPECIAL: Array<string> = GlyphMapSpecial.A.concat(
    GlyphMapSpecial.B
  );

  public static getInstance(): GlyphMapSpecial {
    if (!GlyphMapSpecial._instance) {
      GlyphMapSpecial._instance = new GlyphMapSpecial();
    }
    return GlyphMapSpecial._instance;
  }

  constructor() {
    this.glyphs = GlyphMapSpecial.SPECIAL.map(
      (letter: string, index: number) => {
        return new Glyph(letter, index + 1, this);
      }
    );
  }

  /**
   * Searches for and returns a given Glyph
   * @param search the character to search for the corresponding glyph
   * @returns the given glyph
   */
  getGlyph(search: string): Glyph {
    const val = this.glyphs.find((current: Glyph) => {
      return current.character == search;
    });
    return val ? val : new Glyph("*", 0, this); // TODO: Warn on empty
  }
  //
  getFromIndex(index: number): Glyph {
    return this.glyphs[index - 1];
  }
  //
  public getBiGlyphIndex(a: Glyph, b: Glyph): number {
    if (a.index && b.index) {
      return a.index * 26 + b.index - 26;
    }
    return 0;
  }
  //
  public getAllAsString(): string {
    return GlyphMapSpecial.SPECIAL.toString();
  }
}
