import { Glyph } from "./Glyph";
import { Scripture } from "./Scripture";
import { TriadMappingDirection } from "./TriadMappingDirection";
import { TriadMapPoint } from "./TriadMapPoint";
import { God } from "./wordActions/God";

export interface TriGlyph {
  a: Glyph;
  b: Glyph;
  c: Glyph;
}
export interface TriadIn extends TriGlyph {
  scripture: Scripture;
  i: number;
  remap: boolean;
  GOD: God;
}

export interface TriadRemap {
  a: number;
  b: number;
  c: number;
  direction: TriadMappingDirection;
}
export interface MappedTriad extends TriGlyph {
  direction: TriadMappingDirection;
  triad: Triad;
}

export class Triad implements TriGlyph {
  static REMAP_ARRAY: Array<TriadRemap> = [
    { a: 0, b: 1, c: 2, direction: TriadMappingDirection.ABC },
    { a: 2, b: 3, c: 4, direction: TriadMappingDirection.CAB },
    { a: 4, b: 5, c: 6, direction: TriadMappingDirection.BAC },
    { a: 3, b: 2, c: 1, direction: TriadMappingDirection.ACB },
    { a: 1, b: 2, c: 3, direction: TriadMappingDirection.BCA },
    { a: 6, b: 4, c: 5, direction: TriadMappingDirection.CBA },
  ];

  public D: Array<TriadMapPoint> = [];

  constructor(public IN: TriadIn) {
    this.IN.GOD.O.mapTriad(this);
  }

  public mapToCircle(point: TriadMapPoint, direction: TriadMappingDirection) {
    this.D[direction] = point;
  }

  public get(direction: TriadMappingDirection): MappedTriad {
    const remap: TriadRemap = Triad.REMAP_ARRAY.find(
      (v: TriadRemap) => v.direction == direction
    ) as TriadRemap;
    return {
      a: this.AD[remap.a],
      b: this.AD[remap.b],
      c: this.AD[remap.c],
      direction,
      triad: this,
    };
  }

  public and(): Array<MappedTriad> {
    return Triad.REMAP_ARRAY.map(
      (v: TriadRemap): MappedTriad => this.get(v.direction)
    );
  }

  get a(): Glyph {
    return this.IN.a;
  }

  get b(): Glyph {
    return this.IN.b;
  }

  get c(): Glyph {
    return this.IN.c;
  }

  get AD(): Array<Glyph> {
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
