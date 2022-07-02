import { GlyphMap } from "./GlyphMap";
import { Triad, TriGlyph } from "./Triad";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { BiGlyph } from "./BiGlyph";

export class Glyph {
  private maps: Array<Array<Triad>> = [];
  //
  constructor(
    public character: string,
    public index: number,
    public glyphMap: GlyphMap
  ) {}
  //
  public mapTriad(triad: Triad, direction: TriadMappingDirection) {
    if (this.maps[direction] == undefined) {
      this.maps[direction] = [];
    }
    this.maps[direction].push(triad);
  }
  //
  public get IN(): Array<TriGlyph> {
    if (!this.maps[TriadMappingDirection.BAC]) return [];
    return this.maps[TriadMappingDirection.BAC]
      .sort((a: Triad, b: Triad) => a.IN.i - b.IN.i)
      .map((v: Triad) => v.get(TriadMappingDirection.BAC));
  }
  //
  public get triadsInOrderOfRegistration(): Array<Triad> {
    return this.maps.flat().sort((a: Triad, b: Triad) => a.IN.i - b.IN.i);
  }
  //
  public getBiGlyphsIndex(): Array<number> {
    return this.maps
      .flat()
      .map((v: TriGlyph) => this.glyphMap.getBiGlyphIndex(v.b, v.c));
  }
  //
  public getBiGlyphs(): Array<BiGlyph> {
    return this.maps.flat().map((v: TriGlyph) => {
      return { a: v.b, b: v.c };
    });
  }
  //
  public getConnections(): Array<Glyph> {
    return this.getBiGlyphs().reduce((p: Array<Glyph>, c: BiGlyph) => {
      if (p.indexOf(c.a) == -1) {
        p.push(c.a);
      }
      if (p.indexOf(c.b) == -1) {
        p.push(c.b);
      }
      return p;
    }, []);
  }
}
