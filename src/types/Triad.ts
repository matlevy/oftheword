import { BiGlyph } from "./BiGlyph";
import { Glyph } from "./Glyph";
import { Scripture } from "./Scripture";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { God } from "./wordActions/God";

export interface TriadIn {
  a: Glyph;
  b: Glyph;
  c: Glyph;
  scripture: Scripture;
  i: number;
  remap: boolean;
  GOD: God;
}

export class Triad {
  static REMAP_ARRAY: Array<Array<any>> = [
    [0, 1, 2, TriadMappingDirection.ABC],
    [2, 3, 4, TriadMappingDirection.CAB],
    [4, 5, 6, TriadMappingDirection.BAC],
    [3, 2, 1, TriadMappingDirection.ACB],
    [1, 2, 3, TriadMappingDirection.BCA],
    [6, 4, 5, TriadMappingDirection.CBA],
  ];

  constructor(public IN: TriadIn) {
    console.log(IN);
    if (this.IN.remap) {
      this.reMap();
    }
  }

  private reMap() {
    Triad.REMAP_ARRAY.forEach((v) => {
      this.IN.GOD.O.addMap(
        this.pentMap[v[0]],
        this.pentMap[v[1]],
        this.pentMap[v[2]],
        v[3],
        this.IN.i,
        false,
        this.IN.scripture
      );
    });
  }

  get pentMap(): Array<Glyph> {
    return [
      this.IN.a,
      this.IN.b,
      this.IN.c,
      this.IN.a,
      this.IN.b,
      this.IN.a,
      this.IN.c,
    ];
  }
}
