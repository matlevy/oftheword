import { Word } from "../Word";
import { WordMap } from "../WordMap";

export interface GodIn {
  O: {
    D: WordMap;
  };
  D?: any;
  G?: any;
}
//
export class God {
  constructor(public IN: GodIn) {}
  //
  public ORD(value: Word): Word {
    if (this.IN.O.D.IN.map.get(value.R))
      return this.IN.O.D.IN.map.get(value.R) as Word;
    this.IN.O.D.IN.map.set(value.R, value);
    return this.IN.O.D.IN.map.get(value.R) as Word;
  }
}
