import { BiGlyph } from "./BiGlyph";
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
    public biGlyph: BiGlyph,
    public index: number,
    public direction: TriadMappingDirection,
    public triadMap: TriadMap,
    remap = false
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
