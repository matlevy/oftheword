import { BiGlyph } from "./BiGlyph";
import { Glyph } from "./Glyph";
import { TriadMap } from "./TriadMap";
import { TriadMappingDirection } from "./TriadMappingDirection";

export class TriGlyph {
  static REMAP_ARRAY: Array<Array<any>> = [
    [4, 5, 6, TriadMappingDirection.BAC],
    [2, 3, 4, TriadMappingDirection.CBA],
    [1, 2, 3, TriadMappingDirection.BCA],
    [3, 2, 1, TriadMappingDirection.ACB],
    [6, 4, 5, TriadMappingDirection.CBA],
  ];

  constructor(
    public a?: Glyph,
    public b?: Glyph,
    public c?: Glyph,
    public triadMap?: TriadMap,
    public direction: TriadMappingDirection = TriadMappingDirection.ABC,
    remap = false,
    public readIndex = 0
  ) {
    if (remap) {
      this.reMap();
    }
  }

  public get asString(): string {
    return [this.a?.character, this.b?.character, this.c?.character].join("");
  }

  private reMap() {
    TriGlyph.REMAP_ARRAY.forEach((v) => {
      this.triadMap?.addMap(
        new BiGlyph(this.pentMap[v[1]], this.pentMap[v[2]]),
        this.pentMap[v[0]],
        v[3],
        this.readIndex,
        false
      );
    });
  }

  get ab(): BiGlyph {
    return new BiGlyph(this.a, this.b);
  }

  get bc(): BiGlyph {
    return new BiGlyph(this.b, this.c);
  }

  get ac(): BiGlyph {
    return new BiGlyph(this.a, this.c);
  }

  get pentMap(): Array<Glyph | undefined> {
    return [this.a, this.b, this.c, this.a, this.b, this.a, this.c];
  }

  get pentMapString(): string {
    return this.pentMap
      .map((v: Glyph | undefined) => (v ? v.character : ""))
      .join("");
  }
}
