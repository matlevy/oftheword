import { CircleLink } from "@/types/CircleLink";
import { Letter } from "./Letter";

export class TripletMapPoint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public words: any = {};
  public connections: Array<CircleLink> = [];
  //
  constructor(
    public circle: number,
    public radii: number,
    public ref: string,
    public letter: Letter
  ) {}
  public link(point: TripletMapPoint) {
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
    return (this.circle * 7 + this.radii) / this.letter.IN.T;
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
