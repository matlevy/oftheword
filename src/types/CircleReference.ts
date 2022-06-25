import { BiGlyph } from "./BiGlyph";
import { CircleLink } from "./CircleLink";
import { Glyph } from "./Glyph";
import { Scripture } from "./Scripture";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class GlyphCircleReference {
  public triad: TriGlyph;
  public words: any = {};
  public connections: Array<CircleLink> = [];
  //
  constructor(
    public circle: number,
    public radii: number,
    public glyph: Glyph,
    public biGlyph: BiGlyph,
    public index: number,
    public direction: TriadMappingDirection,
    public triadMap: TriadMap,
    remap = false,
    public scripture?: Scripture
  ) {
    this.triad = new TriGlyph(
      glyph,
      biGlyph.a,
      biGlyph.b,
      triadMap,
      direction,
      remap,
      this.index
    );
  }
  public link(point: GlyphCircleReference | undefined) {
    if (point) {
      let link: CircleLink | undefined = this.connections.find(
        (v: CircleLink) => v.point == point
      );
      if (link) {
        link.increment();
      } else {
        link = new CircleLink(this);
        link.increment();
        this.connections.push(link);
      }
    }
  }
  public getBiGlyphIndex(): number {
    return (this.circle * 7 + this.radii) / this.glyph.index;
  }
  public getPairedGlyphs(): Array<number> {
    let b: number = this.getBiGlyphIndex() % 26;
    //
    if (b == 0) {
      b = 26;
    }
    //
    const a: number = (this.getBiGlyphIndex() + 26 - b) / 26;
    return [a, b];
  }
}
