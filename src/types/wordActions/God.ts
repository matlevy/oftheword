import { GlyphMap } from "../GlyphMap";
import { TriadMap } from "../TriadMap";
import { Word } from "../Word";
import { WordMap } from "../WordMap";

export interface GodIn {
  OD: WordMap;
  O?: TriadMap;
  D?: any;
  G: GlyphMap;
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
  get O(): TriadMap {
    return this.IN.O as TriadMap;
  }
}
