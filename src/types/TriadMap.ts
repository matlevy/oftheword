import { BiGlyph } from "./BiGlyph";
import { GlyphCircleReference } from "./CircleReference";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class TriadMap {
  private triadMap: Array<Array<any>> = [];

  constructor(public glyphMap: GlyphMap) {}
  //
  private calcCircle(pair: BiGlyph, single?: Glyph): Array<number> {
    if (pair && single) {
      const ofSeven = (pair.getMapValue() * single.index) % 7;
      const index = (pair.getMapValue() * single.index - ofSeven) / 7;
      return [index, ofSeven];
    }
    return [0, 0]; // TODO: WARN OF NULL
  }
  //
  public addMap(
    pair: BiGlyph,
    single?: Glyph,
    direction: TriadMappingDirection = TriadMappingDirection.ABC,
    readIndex = 0,
    remap = false
  ) {
    const [radii, circle] = this.calcCircle(pair, single);
    if (!this.triadMap[radii]) {
      this.triadMap[radii] = new Array(6);
    }
    if (!this.triadMap[radii][circle]) {
      this.triadMap[radii][circle] = {};
    }
    if (radii != undefined && circle != undefined && single) {
      //
      let circlePoint: GlyphCircleReference = this.getMap(
        circle,
        radii,
        single.character + pair.a?.character + pair.b?.character
      );
      //
      if (!circlePoint) {
        circlePoint = new GlyphCircleReference(
          circle,
          radii,
          single,
          pair,
          readIndex,
          direction,
          this,
          remap
        );
      }
      //
      single.mapCirclePoint(circlePoint);
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
