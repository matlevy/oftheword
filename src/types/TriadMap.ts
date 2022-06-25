import { BiGlyph } from "./BiGlyph";
import { GlyphCircleReference } from "./CircleReference";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { Scripture } from "./Scripture";
import { TriadMappingDirection } from "./TriadMappingDirection";

export class TriadMap {
  private triadMap: Array<Array<any>> = [];

  constructor(public glyphMap: GlyphMap) {}
  //
  public calcCircle(pair: BiGlyph, single?: Glyph): Array<number> {
    if (pair && single) {
      const ofSeven = (pair.getMapValue() * single.index) % 7;
      const index = (pair.getMapValue() * single.index - ofSeven) / 7;
      return [index, ofSeven];
    }
    return [0, 0]; // TODO: WARN OF NULL
  }
  //
  public addMap(
    a: Glyph,
    b: Glyph,
    c: Glyph,
    direction: TriadMappingDirection = TriadMappingDirection.ABC,
    readIndex = 0,
    remap = false,
    scripture?: Scripture
  ) {
    // console.log("mapping:", a.character + b.character + c.character, direction);
    const pair = new BiGlyph(a, b);
    const [radii, circle] = this.calcCircle(pair, c);
    if (!this.triadMap[radii]) {
      this.triadMap[radii] = new Array(6);
    }
    if (!this.triadMap[radii][circle]) {
      this.triadMap[radii][circle] = {};
    }
    if (radii != undefined && circle != undefined && c) {
      //
      let circlePoint: GlyphCircleReference = this.getMap(
        circle,
        radii,
        c.character + pair.a?.character + pair.b?.character
      );
      //
      if (!circlePoint) {
        circlePoint = new GlyphCircleReference(
          circle,
          radii,
          c,
          pair,
          readIndex,
          direction,
          this,
          remap,
          scripture
        );
      }
      //
      c.mapCirclePoint(circlePoint);
      return circlePoint;
    }
  }
  public getMap(
    circle: number,
    radii: number,
    ref: string
  ): GlyphCircleReference {
    return this.triadMap[radii][circle][ref];
  }
  //
  public getGlyphFromIndex(index: number): Glyph {
    return this.glyphMap.getFromIndex(index);
  }
}
