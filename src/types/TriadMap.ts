import { BiGlyph } from "./BiGlyph";
import { TriadMapPoint } from "./TriadMapPoint";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { MappedTriad, Triad, TriadIn, TriGlyph } from "./Triad";
import { TriadCache } from "./TriadCache";

export class TriadMap {
  public A: Array<Array<any>> = [];
  public O: TriadCache = new TriadCache();

  constructor(public glyphMap: GlyphMap) {}
  //
  public calcCircle(pair: BiGlyph, single?: Glyph): Array<number> {
    if (pair && single) {
      const ofSeven =
        (this.glyphMap.getBiGlyphIndex(pair.a, pair.b) * single.index) % 7;
      const index =
        (this.glyphMap.getBiGlyphIndex(pair.a, pair.b) * single.index -
          ofSeven) /
        7;
      return [index, ofSeven];
    }
    return [0, 0]; // TODO: WARN OF NULL
  }
  //
  public mapTriad(triad: Triad) {
    triad.and().forEach((v: MappedTriad) => this.and(v));
  }
  //
  public create<R>(IN: TriadIn): R {
    if (this.O.get<R>(IN)) {
      return this.O.get<R>(IN);
    }
    return this.O.store<R>(IN);
  }
  //
  private and(value: MappedTriad) {
    const pair = {
      a: value.b,
      b: value.c,
    };
    const [radii, circle] = this.calcCircle(pair, value.a);
    //
    if (!this.A[radii]) {
      this.A[radii] = new Array(6);
    }
    //
    if (!this.A[radii][circle]) {
      this.A[radii][circle] = {};
    }
    //
    if (radii != undefined && circle != undefined && value.a) {
      const ref = value.a.character + pair.a?.character + pair.b?.character;
      this.A[radii][circle][ref] = new TriadMapPoint(
        circle,
        radii,
        ref,
        value.a
      );
      //
      value.a.mapTriad(value.triad, value.direction);
      value.triad.mapToCircle(this.getMap(circle, radii, ref), value.direction);
    }
  }
  //
  public getMap(circle: number, radii: number, ref: string): TriadMapPoint {
    return this.A[radii][circle][ref];
  }
  //
  public getGlyphFromIndex(index: number): Glyph {
    return this.glyphMap.getFromIndex(index);
  }
}
