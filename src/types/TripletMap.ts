/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TwoLetters } from "./TwoLetters";
import { TripletMapPoint } from "@/types/TripletMapPoint";
import { Letter } from "./Letter";
import { LetterMap } from "./LetterMap";
import { MappedTriplet, Triplet, TripletIn } from "./Triplet";
import { TripletCache } from "./TripletCache";

export class TripletMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public A: Array<Array<any>> = [];
  public O: TripletCache = new TripletCache();

  constructor(public letterMap: LetterMap) {}
  //
  public calcCircle(pair: TwoLetters, single?: Letter): Array<number> {
    if (pair && single) {
      const ofSeven =
        (this.letterMap.getIndexOfTwoLetters(pair.a!, pair.b!) * single.IN.T) %
        7;
      const index =
        (this.letterMap.getIndexOfTwoLetters(pair.a!, pair.b!) * single.IN.T -
          ofSeven) /
        7;
      return [index, ofSeven];
    }
    return [0, 0]; // TODO: WARN OF NULL
  }
  //
  public mapTriplet(triplet: Triplet) {
    triplet.and().forEach((v: MappedTriplet) => this.and(v));
  }
  //
  public create<R>(IN: TripletIn): R {
    if (this.O.get<R>(IN)) {
      return this.O.get<R>(IN);
    }
    return this.O.store<R>(IN);
  }
  //
  private and(value: MappedTriplet) {
    const pair = {
      a: value.b,
      b: value.c,
    };
    const [radii, circle] = this.calcCircle(pair, value.a);
    //
    if (!this.A[radii]) {
      this.A[radii] = new Array(6);
    }
    //
    if (!this.A[radii][circle]) {
      this.A[radii][circle] = {};
    }
    //
    if (radii != undefined && circle != undefined && value.a) {
      const ref = value.a.IN.E + pair.a?.IN.E + pair.b?.IN.E;
      this.A[radii][circle][ref] = new TripletMapPoint(
        circle,
        radii,
        ref,
        value.a
      );
      //
      value.a.mapTriplet(value.triad, value.direction);
      value.triad.mapToCircle(this.getMap(circle, radii, ref), value.direction);
    }
  }
  //
  public getMap(circle: number, radii: number, ref: string): TripletMapPoint {
    return this.A[radii][circle][ref];
  }
  //
  public getGlyphFromIndex(index: number): Letter {
    return this.letterMap.getFromIndex(index);
  }
}
