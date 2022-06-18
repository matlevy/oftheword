import { BiGlyph } from "./BiGlyph";
import { GlyphCircleReference } from "./CircleReference";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class TriadMap {
  private triadMap: Array<Array<GlyphCircleReference>> = [];

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
    type: TriadMappingDirection = TriadMappingDirection.ABC,
    readIndex = 0,
    remap = false
  ) {
    const [r, i] = this.calcCircle(pair, single);
    if (!this.triadMap[r]) {
      this.triadMap[r] = new Array(6);
    }
    if (r != undefined && i != undefined && single) {
      if (this.triadMap[r][i] == undefined) {
        this.triadMap[r][i] = single.addMap(r, i, type, this, remap, readIndex);
      } else {
        console.log("skip:", r, i);
      }
    }
  }
  //
  public getGlyphFromIndex(index: number): Glyph {
    return this.glyphMap.getFromIndex(index);
  }
}
