import { AbstractSubject } from "./AbstractSubject";
import { GlyphCircleReference } from "./CircleReference";
import { GlyphMap } from "./GlyphMap";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class Glyph extends AbstractSubject {
  private maps: Array<Array<GlyphCircleReference>> = [];
  private mapIndex = 0;
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
  public addMap(
    c: number,
    r: number,
    type: TriadMappingDirection,
    triadMap: TriadMap,
    remap = false,
    readIndex = 0
  ) {
    if (this.maps[r] == undefined) {
      this.maps[r] = [];
    }
    this.maps[r][c] = new GlyphCircleReference(
      c,
      r,
      this,
      readIndex,
      type,
      triadMap,
      remap
    );
    this.mapIndex += 1;
    return this.maps[r][c];
  }
  //
  public getIncrementedIndex(): number {
    this.mapIndex += 1;
    return this.mapIndex;
  }
  //
  public get triadsInByOrder(): Array<TriGlyph> {
    return this.maps
      .flat()
      .sort(
        (a: GlyphCircleReference, b: GlyphCircleReference) => a.index - b.index
      )
      .filter(
        (v: GlyphCircleReference) =>
          v.triad.direction == TriadMappingDirection.BAC
      )
      .map((v: GlyphCircleReference) => {
        console.log(v);
        return v;
      })
      .map((v: GlyphCircleReference) => v.triad);
  }
  //
  public get triadsInOrderOfRegistration(): Array<TriGlyph> {
    return this.maps
      .flat()
      .sort(
        (a: GlyphCircleReference, b: GlyphCircleReference) => a.index - b.index
      )
      .map((v: GlyphCircleReference) => v.triad);
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
