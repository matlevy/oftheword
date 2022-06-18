import { AbstractSubject } from "./AbstractSubject";
import { GlyphCircleReference } from "./CircleReference";
import { GlyphMap } from "./GlyphMap";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class Glyph extends AbstractSubject {
  private maps: Array<Array<GlyphCircleReference>> = [];
  //
  constructor(
    public character: string,
    public index: number,
    public glyphMap: GlyphMap
  ) {
    super();
  }
  //
  public get first(): TriGlyph {
    return this.triadsInOrderOfRegistration[0];
  }
  //
  public get firstIn(): TriGlyph {
    return this.triadsInByOrder[0];
  }
  //
  public mapCirclePoint(map: GlyphCircleReference) {
    if (this.maps[map.direction] == undefined) {
      this.maps[map.direction] = [];
    }
    this.maps[map.direction].push(map);
  }
  //
  public get triadsInByOrder(): Array<TriGlyph> {
    return this.maps[TriadMappingDirection.BAC]
      .map((v: GlyphCircleReference) => v.triad)
      .sort((a: TriGlyph, b: TriGlyph) => a.readIndex - b.readIndex);
  }
  //
  public get triadsInOrderOfRegistration(): Array<TriGlyph> {
    return this.maps
      .flat()
      .map((v: GlyphCircleReference) => v.triad)
      .sort((a: TriGlyph, b: TriGlyph) => a.readIndex - b.readIndex);
  }
  //
  public getChildBiGlyphsAsIndexes(): Array<number> {
    return this.maps
      .flat()
      .map((v: GlyphCircleReference) => v.getBiGlyphIndex());
  }
  //
  public getPairedGlyphIndexes(): Array<Array<number>> {
    return this.maps
      .flat()
      .map((v: GlyphCircleReference) => v.getPairedGlyphs());
  }
  //
  public getConnections(): Array<Glyph> {
    console.log(this.triadsInOrderOfRegistration);
    return this.getPairedGlyphIndexes()
      .flat()
      .reduce((p: Array<number>, c: number) => {
        if (p.indexOf(c) == -1) {
          p.push(c);
        }
        return p;
      }, [])
      .map((v: number) => this.glyphMap.getFromIndex(v));
  }
}
