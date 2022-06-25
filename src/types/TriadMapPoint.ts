import { CircleLink } from "./CircleLink";
import { Glyph } from "./Glyph";

export class TriadMapPoint {
  public words: any = {};
  public connections: Array<CircleLink> = [];
  //
  constructor(
    public circle: number,
    public radii: number,
    public ref: string,
    public glyph: Glyph
  ) {}
  public link(point: TriadMapPoint) {
    if (point) {
      let link: CircleLink = this.connections.find(
        (v: CircleLink) => v.point == point
      ) as CircleLink;
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
