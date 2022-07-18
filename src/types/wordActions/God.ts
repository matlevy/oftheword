import { LetterMap } from "../LetterMap";
import { SpecialLetterMap } from "../SpecialLetterMap";
import { WATERS } from "./Waters";
import { TripletMap } from "../TripletMap";
import { Word } from "../Word";
import { WordMap } from "../WordMap";

export interface GodIn {
  G: LetterMap;
  O?: TripletMap;
  OD: WordMap;
  GO?: WATERS;
  X: SpecialLetterMap;
}
//
export class God {
  constructor(public IN: GodIn) {}
  //
  public ORD(value: Word): Word {
    if (this.IN.OD.get(value.R)) return this.IN.OD.get(value.R) as Word;
    this.IN.OD.map(value.R, value);
    return this.IN.OD.get(value.R) as Word;
  }
  //
  get OD(): WordMap {
    return this.IN.OD;
  }
  //
  get G(): LetterMap {
    return this.IN.G;
  }
  //
  get O(): TripletMap {
    return this.IN.O as TripletMap;
  }
  //
  get GO(): WATERS {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.IN.GO!;
  }
}
