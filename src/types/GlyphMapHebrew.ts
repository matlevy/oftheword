import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";

export class GlyphMapHebrew implements GlyphMap {
  private static _instance: GlyphMapHebrew;

  private static A: Array<number> = [1488, 1489, 1490, 1491, 1492];
  private static V: Array<number> = [1493];
  private static Z: Array<number> = [1494, 1495, 1496, 1497, 1498, 1499];
  private static L: Array<number> = [1500, 1501, 1502, 1503, 1504, 1505, 1506];
  private static P: Array<number> = [1507, 1508];
  private static T: Array<number> = [1509, 1510, 1511, 1512, 1513, 1514];

  private glyphs: Array<Glyph> = [];

  private static ALPHABET: Array<string> = GlyphMapHebrew.A.concat(
    GlyphMapHebrew.V
  )
    .concat(GlyphMapHebrew.Z)
    .concat(GlyphMapHebrew.L)
    .concat(GlyphMapHebrew.P)
    .concat(GlyphMapHebrew.T)
    .map((v: number) => String.fromCharCode(v));

  public static getInstance(): GlyphMapHebrew {
    if (!GlyphMapHebrew._instance) {
      GlyphMapHebrew._instance = new GlyphMapHebrew();
    }
    return GlyphMapHebrew._instance;
  }

  constructor() {
    this.glyphs = GlyphMapHebrew.ALPHABET.map(
      (letter: string, index: number) => {
        return new Glyph(letter, index + 1, this);
      }
    );
  }

  public get start(): number {
    return 1487;
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
    return GlyphMapHebrew.ALPHABET.toString();
  }
  //
  public getPresenterClass(glyph: Glyph) {
    if (GlyphMapHebrew.A.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-a";
    }
    if (GlyphMapHebrew.Z.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-e";
    }
    if (GlyphMapHebrew.L.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-i";
    }
    if (GlyphMapHebrew.T.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-o";
    }
    if (GlyphMapHebrew.P.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-u";
    }
    if (GlyphMapHebrew.V.indexOf(glyph.character.charCodeAt(0)) != -1) {
      return "glyph-u";
    }
    return "";
  }
}
