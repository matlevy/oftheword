/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Store } from "./interfaces/Store";
import { Triplet, TripletIn } from "./Triplet";

export class TripletCache implements Store<TripletIn, TripletIn, TripletIn> {
  public O: Map<string, unknown> = new Map<string, unknown>();

  public get<R>(value: TripletIn): R {
    const key: string = value
      .a!.IN.E.concat(value.b!.IN.E)
      .concat(value.c!.IN.E);
    return this.O.get(key) as R;
  }

  public store<R>(value: TripletIn): R {
    if (this.get<R>(value)) {
      return this.get<R>(value);
    } else {
      const k: string = value
        .a!.IN.E.concat(value.b!.IN.E)
        .concat(value.c!.IN.E);
      this.O.set(k, new Triplet(value));
      return this.get<R>(value);
    }
  }
}
