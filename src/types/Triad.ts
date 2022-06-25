import { BiGlyph } from "./BiGlyph";
import { Glyph } from "./Glyph";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { God } from "./wordActions/God";

export interface TriadIn {
    a: Glyph,
    b: Glyph,
    c: Glyph,
    i: number,
    remap: boolean,
    GOD: God
}

export class Triad {
  static REMAP_ARRAY: Array<Array<any>> = [
    [4, 5, 6, TriadMappingDirection.BAC],
    [2, 3, 4, TriadMappingDirection.CBA],
    [1, 2, 3, TriadMappingDirection.BCA],
    [3, 2, 1, TriadMappingDirection.ACB],
    [6, 4, 5, TriadMappingDirection.CBA],
  ];

  constructor(public IN:TriadIn ) {
    if (this.IN.remap) {
      this.reMap();
    }
  }

  private reMap() {
    Triad.REMAP_ARRAY.forEach((v) => {
      this.IN.GOD.O.addMap(
        new BiGlyph(this.pentMap[v[1]], this.pentMap[v[2]]),
        this.pentMap[v[0]],
        v[3],
        0,
        false
      );
    });
  }

  get ab(): BiGlyph {
    return new BiGlyph(this.IN.a, this.IN.b);
  }

  get bc(): BiGlyph {
    return new BiGlyph(this.IN.b, this.IN.c);
  }

  get ac(): BiGlyph {
    return new BiGlyph(this.IN.a, this.IN.c);
  }

  get pentMap(): Array<Glyph | undefined> {
    return [this.IN.a, this.IN.b, this.IN.c, this.IN.a, this.IN.b, this.IN.a, this.IN.c];
  }

  get pentMapString(): string {
    return this.pentMap
      .map((v: Glyph | undefined) => (v ? v.character : ""))
      .join("");
  }
}
