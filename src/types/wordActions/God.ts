import { GlyphMap } from "../GlyphMap";
import { GlyphMapSpecial } from "../GlyphMapSpecial";
import { WATERS } from "./Waters";
import { TriadMap } from "../TriadMap";
import { Word } from "../Word";
import { WordMap } from "../WordMap";

export interface GodIn {
  G: GlyphMap;
  O?: TriadMap;
  OD: WordMap;
  GO?: WATERS;
  X: GlyphMapSpecial;
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
  get G(): GlyphMap {
    return this.IN.G;
  }
  //
  get O(): TriadMap {
    return this.IN.O as TriadMap;
  }
}
