/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Triplet, TripletInterface } from "./Triplet";
import { TripletMappingDirection } from "./TripletMappingDirection";
import { TwoLetters } from "./TwoLetters";
import { WATERS } from "./wordActions/Waters";
import { LetterMap } from "./LetterMap";

export interface LetterIn {
  E: string;
  T: number;
  R?: WATERS;
  TT: LetterMap;
}
export class Letter {
  private maps: Array<Array<Triplet>> = [];
  private P: Array<Array<TripletInterface>> = [];
  //
  constructor(public IN: LetterIn) {}
  //
  public mapTriplet(triad: Triplet, direction: TripletMappingDirection) {
    if (this.maps[direction] == undefined) {
      this.maps[direction] = [];
    }
    this.maps[direction].push(triad);
  }
  //
  public MAP(direction: TripletMappingDirection): Array<TripletInterface> {
    if (!this.P[direction]) {
      if (!this.maps[direction]) {
        this.P[direction] = [];
      } else {
        this.P[direction] = this.maps[direction]
          .sort(this.triadSort)
          .map((v: Triplet) => v.get(direction));
      }
    }
    return this.P[direction];
  }
  //
  private triadSort(a: Triplet, b: Triplet) {
    return a.P - b.P;
  }
  //
  public getIndexOfBC(): Array<number> {
    return this.maps
      .flat()
      .map((v: Triplet) => this.IN.TT.getIndexOfTwoLetters(v.b!, v.c!));
  }
  //
  public getTwoLetters(): Array<TripletInterface> {
    return this.maps.flat().map((v: Triplet) => {
      return { a: v.b, b: v.c };
    });
  }
  //
  public getConnections(): Array<Letter> {
    return this.getTwoLetters().reduce((p: Array<Letter>, c: TwoLetters) => {
      if (p.indexOf(c.a!) == -1) {
        p.push(c.a!);
      }
      if (p.indexOf(c.b!) == -1) {
        p.push(c.b!);
      }
      return p;
    }, []);
  }
}
