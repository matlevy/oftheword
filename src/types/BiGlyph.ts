import { Glyph } from "./Glyph";

export class BiGlyph {
  constructor(public a?: Glyph, public b?: Glyph) {}
  public getMapValue(): number {
    if (this.a?.index && this.b?.index) {
      return this.a.index * 26 + this.b.index - 26;
    }
    return 0;
  }
}
