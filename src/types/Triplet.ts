/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Letter } from "./Letter";
import { Scripture, ScriptureIn, ScriptureReference } from "@/types/Scripture";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { TripletMapPoint } from "@/types/TripletMapPoint";
import { God } from "./wordActions/God";

export interface TripletInterface {
  a?: Letter;
  b?: Letter;
  c?: Letter;
}
export interface GlyphPoint {
  ref: ScriptureReference;
  index: number;
}
export interface TripletIn extends TripletInterface {
  scripture: Scripture;
  i: GlyphPoint;
  remap: boolean;
  GOD: God;
}

export interface TripletRemap {
  a: number;
  b: number;
  c: number;
  direction: TripletMappingDirection;
}
export interface MappedTriplet extends TripletInterface {
  direction: TripletMappingDirection;
  triad: Triplet;
}

export interface TripletCircularMapPoint {
  point: TripletMapPoint;
  direction: TripletMappingDirection;
}
export class Triplet implements TripletInterface {
  static REMAP_ARRAY: Array<TripletRemap> = [
    { a: 0, b: 1, c: 2, direction: TripletMappingDirection.ABC },
    { a: 2, b: 3, c: 4, direction: TripletMappingDirection.CAB },
    { a: 4, b: 5, c: 6, direction: TripletMappingDirection.BAC },
    { a: 3, b: 2, c: 1, direction: TripletMappingDirection.ACB },
    { a: 1, b: 2, c: 3, direction: TripletMappingDirection.BCA },
    { a: 6, b: 4, c: 5, direction: TripletMappingDirection.CBA },
  ];

  public D: Array<TripletMapPoint> = [];
  public O: Array<Array<Array<number>>> = [];

  constructor(public IN: TripletIn) {
    this.IN.GOD.O.mapTriplet(this);
  }

  public mapToCircle(
    point: TripletMapPoint,
    direction: TripletMappingDirection
  ) {
    const p = this.IN.GOD.O.letterMap.getIndexOfTwoLetters(this.b, this.c);
    this.D[direction] = point;
  }

  public get(direction: TripletMappingDirection): MappedTriplet {
    const remap: TripletRemap = Triplet.REMAP_ARRAY.find(
      (v: TripletRemap) => v.direction == direction
    ) as TripletRemap;
    return {
      a: this.AD[remap.a],
      b: this.AD[remap.b],
      c: this.AD[remap.c],
      direction,
      triad: this,
    };
  }

  public and(): Array<MappedTriplet> {
    return Triplet.REMAP_ARRAY.map(
      (v: TripletRemap): MappedTriplet => this.get(v.direction)
    );
  }

  public map(IN: ScriptureIn, index: number): Triplet {
    const R: ScriptureReference = IN.ref
      ? IN.ref
      : {
          book: 0,
          chapter: 0,
          verse: 0,
        };
    if (this.O[R.book] == undefined) {
      this.O[R.book] = [];
    }
    if (this.O[R.book][R.chapter] == undefined) {
      this.O[R.book][R.chapter] = [];
    }
    this.O[R.book][R.chapter][R.verse] = index;
    return this;
  }

  get a(): Letter {
    return this.IN.a!;
  }

  get b(): Letter {
    return this.IN.b!;
  }

  get c(): Letter {
    return this.IN.c!;
  }

  public FA(C: string) {
    const P = this.IN.GOD.G.getAllAsString().indexOf(C);
    return [this.a.FAC[P], this.b.FAC[P], this.c.FAC[P]];
  }

  public get FACE() {
    return [...this.IN.GOD.G.getAllAsString()].map((C: string) => this.FA(C));
  }

  get AD(): Array<Letter> {
    return [
      this.IN.a!,
      this.IN.b!,
      this.IN.c!,
      this.IN.a!,
      this.IN.b!,
      this.IN.a!,
      this.IN.c!,
    ];
  }

  public get P(): number {
    return (
      this.IN.i.ref.book * 100000000 +
      this.IN.i.ref.chapter * 1000000 +
      this.IN.i.ref.verse * 1000 +
      this.IN.i.index
    );
  }
}
