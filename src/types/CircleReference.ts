import { Glyph } from "./Glyph";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriGlyph } from "./TriGlyph";

export class GlyphCircleReference {
  public triad: TriGlyph;

  constructor(
    public circle: number,
    public radii: number,
    public glyph: Glyph,
    public index: number,
    public direction: TriadMappingDirection,
    public triadMap: TriadMap,
    remap = false
  ) {
    const a: Glyph = this.glyph;
    const b: Glyph = this.glyph.glyphMap.getFromIndex(
      this.getPairedGlyphs()[0]
    );
    const c: Glyph = this.glyph.glyphMap.getFromIndex(
      this.getPairedGlyphs()[1]
    );
    this.triad = new TriGlyph(a, b, c, triadMap, direction, remap, this.index);
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
