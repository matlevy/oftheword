import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";

export class GlyphMapLatin implements GlyphMap {
  private static _instance: GlyphMapLatin;

  private static A: Array<string> = ["A", "B", "C", "D"];
  private static E: Array<string> = ["E", "F", "G", "H"];
  private static I: Array<string> = ["I", "J", "K", "L", "M", "N"];
  private static O: Array<string> = ["O", "P", "Q", "R", "S", "T"];
  private static U: Array<string> = ["U", "V", "W", "X", "Y", "Z"];

  private glyphs: Array<Glyph> = [];

  private static ALPHABET: Array<string> = GlyphMapLatin.A.concat(
    GlyphMapLatin.E
  )
    .concat(GlyphMapLatin.I)
    .concat(GlyphMapLatin.O)
    .concat(GlyphMapLatin.U);

  public static getInstance(): GlyphMapLatin {
    if (!GlyphMapLatin._instance) {
      GlyphMapLatin._instance = new GlyphMapLatin();
    }
    return GlyphMapLatin._instance;
  }

  constructor() {
    this.glyphs = GlyphMapLatin.ALPHABET.map(
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
      return current.character.toUpperCase() == search.toUpperCase();
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
    return GlyphMapLatin.ALPHABET.toString();
  }
  //
  public getPresenterClass(glyph: Glyph) {
    if (GlyphMapLatin.A.indexOf(glyph.character) != -1) {
      return "glyph-a";
    }
    if (GlyphMapLatin.E.indexOf(glyph.character) != -1) {
      return "glyph-e";
    }
    if (GlyphMapLatin.I.indexOf(glyph.character) != -1) {
      return "glyph-i";
    }
    if (GlyphMapLatin.O.indexOf(glyph.character) != -1) {
      return "glyph-o";
    }
    if (GlyphMapLatin.U.indexOf(glyph.character) != -1) {
      return "glyph-u";
    }
    return "";
  }
}
