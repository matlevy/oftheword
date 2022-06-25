import { BiGlyph } from "./BiGlyph";
import { GlyphCircleReference } from "./CircleReference";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";

export class Word {
  public glyphs: Glyph[] = [];
  public output: Array<Glyph | undefined> | undefined = [];
  public mapGlyphsToTriadMap = true;

  private firstPoint: GlyphCircleReference | undefined;
  private lastPoint: GlyphCircleReference | undefined;
  //
  constructor(
    public source: string,
    public glyphMap: GlyphMap,
    public triadMap: TriadMap
  ) {
    if (this.source.length > 3) {
      this.reset();
    }
  }
  //
  private reset() {
    this.glyphs = [];
    this.extractGlyphs();
    this.mapConectingTriads();
    this.updateOutput();
  }
  //
  public update(value?: string) {
    if (value) {
      this.source = value;
    }
    this.reset();
  }
  //
  private updateOutput() {
    this.output = this.source.match(/\w/gi)?.map((value: string) => {
      if (value) {
        return this.getGlyph(value);
      }
      return undefined;
    });
  }
  //
  private extractGlyphs() {
    this.source
      .match(/\w/gi)
      ?.reduce((prev: string[], curr: string) => {
        if (prev.indexOf(curr) == -1) {
          prev.push(curr);
        }
        return prev;
      }, [])
      .forEach((value: string) => {
        if (this.glyphMap.getGlyph(value)) {
          this.glyphs.push(this.glyphMap.getGlyph(value));
        }
      });
  }
  //
  private mapConectingTriads() {
    this.source
      .match(/\w/gi)
      ?.reduce(this.createTriadSet, [])
      .forEach(this.mapGlyphTriad);
  }
  //
  private createTriadSet(
    prev: Array<Array<Glyph>>,
    curr: string,
    index: number,
    all: string[]
  ): Array<Array<Glyph>> {
    if (all[index + 1] && all[index + 2]) {
      const returned: Array<Glyph> = [curr, all[index + 1], all[index + 2]].map(
        (char: string) => this.glyphMap.getGlyph(char)
      );
      prev.push(returned);
    }
    return prev;
  }
  //
  private mapGlyphTriad(triplet: Array<Glyph>, index: number) {
    if (this.mapGlyphsToTriadMap) {
      const point: GlyphCircleReference | undefined = this.triadMap.addMap(
        new BiGlyph(triplet[1], triplet[2]),
        triplet[0],
        TriadMappingDirection.ABC,
        index,
        true
      );
      if (this.lastPoint) {
        this.lastPoint.link(point);
      } else {
        this.firstPoint = point;
      }
      this.lastPoint = point;
    }
  }
  //
  getGlyph(search: string): Glyph | undefined {
    return this.glyphs.find((current: Glyph) => {
      return current.character == search;
    });
  }
}
