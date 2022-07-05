import { CognateStore } from "../CognateStore";
import { GlyphMap } from "../GlyphMap";
import { GlyphMapSpecial } from "../GlyphMapSpecial";
import { Map, ReferencePoint } from "../SourceMap";
import { TriadMap } from "../TriadMap";
import { Word } from "../Word";
import { WordMap } from "../WordMap";

export interface GodIn {
  G: GlyphMap;
  O?: TriadMap;
  OD: WordMap;
  GO?: Map;
  X: GlyphMapSpecial;
}
//
export class God {
  public OG: CognateStore = new CognateStore({
    GOD: this,
  });

  constructor(public IN: GodIn) {}
  //
  public ORD(value: Word): Word {
    if (this.IN.OD.get(value.R)) return this.IN.OD.get(value.R) as Word;
    this.OG.store(
      this.IN.GO?.search(value.R, "", {
        found: [],
        scripture: {
          book: value.IN.scripture.IN.ref?.book as number,
          chapter: value.IN.scripture.IN.ref?.chapter as number,
          verse: value.IN.scripture.IN.ref?.verse as number,
        },
      }) as ReferencePoint
    );
    this.IN.OD.map(value.R, value);
    return this.IN.OD.get(value.R) as Word;
  }
  //
  get GO(): Map {
    return this.IN.GO!;
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
