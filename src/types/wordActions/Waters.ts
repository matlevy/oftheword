import { BiglyphContainer } from "../BiGlyph";
import { Glyph } from "../Glyph";
import { GlyphMap } from "../GlyphMap";
import { SPIRIT } from "./Spirit";

export interface WATERS {
  FACE(spirit: SPIRIT): SPIRIT;
  ACE(string: string): Waters;
  E: Map<string, SPIRIT>;
  RS(
    map: GlyphMap,
    pair: BiglyphContainer,
    curr: number,
    max: number
  ): BiglyphContainer;
}

export class Waters implements WATERS {
  public AE = "";
  public E: Map<string, SPIRIT> = new Map<string, SPIRIT>();
  //
  public FACE(spirit: SPIRIT): SPIRIT {
    spirit.S = spirit.S.toLocaleUpperCase();
    spirit.P = this.AE.indexOf(spirit.S, 0);
    spirit.I = spirit.I == undefined ? [] : spirit.I;
    if (spirit.P) {
      spirit.IT = [
        this.AE.charCodeAt(this.AE.indexOf(spirit.S, 0) - 1) - 64,
        this.AE.charCodeAt(this.AE.indexOf(spirit.S, 0) + spirit.S.length) - 64,
      ];
    }
    if (this.E.get(spirit.S)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.E.get(spirit.S)!;
    } else if (spirit.P > -1) {
      const a: SPIRIT = this.ATE(spirit, this.T(spirit));
      if (a && a.S) {
        this.ATE(spirit, spirit.S.replace(a.S, ""));
      }
    } else {
      // Term not found, start dividing the word into chunks, starting
      // with two letters;
      let match = this.T(spirit, "", true);
      this.ATE(spirit, match);
      let attempts = 0;
      let a: SPIRIT = this.ATE(spirit, this.T(spirit, match));
      while (a && a.S != "" && attempts < 5) {
        match = match.concat(a.S);
        a = this.ATE(spirit, this.T(spirit, match));
        attempts++;
      }
    }
    return spirit;
  }
  //
  public T(a: SPIRIT, i?: string, reverse?: boolean): string {
    let R = reverse ? 2 : a.S.length - 1;
    let I = i ? a.S.replace(i, "") : a.S.slice(0, R);
    if (reverse) {
      while (R < I.length) {
        const PI = this.AE.indexOf(I, 0);
        if (PI != -1) break;
        R++;
        I = a.S.slice(0, R);
      }
      return I;
    }
    while (I.length >= 2) {
      const PI = this.AE.indexOf(I);
      if (PI != -1 && PI != a.P) break;
      R--;
      I = I.slice(0, R);
    }
    return I;
  }
  //
  public RS(
    map: GlyphMap,
    pair: BiglyphContainer,
    curr = 0,
    max = 5
  ): BiglyphContainer {
    const pos: number = this.AE.indexOf(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pair.IN.a!.character.concat(pair.IN.b!.character)
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const a: Glyph = map.getGlyph(this.AE.charAt(pos - 1));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const b: Glyph = map.getGlyph(this.AE.charAt(pos + 2));
    const n: BiglyphContainer = {
      BG: pair.IN,
      IN: {
        a: a,
        b: b,
      },
    };
    if (curr != max) {
      this.RS(map, n, curr + 1, max);
    }
    if (n.IN.a?.character != "*") pair.PR = n;
    return pair;
  }
  //
  public ATE(spirit: SPIRIT, IN: string): SPIRIT {
    const SPIRIT: SPIRIT = this.E.get(IN) as SPIRIT;
    if (SPIRIT) {
      Object(spirit.T)[IN] = this.E.get(IN) as SPIRIT;
      return spirit;
    }
    if (IN != "") {
      Object(spirit.T)[IN] = this.E.get(IN) || {
        S: IN,
        P: this.AE.indexOf(IN, 0),
        T: {},
        I: [],
        IT: [
          this.AE.charCodeAt(this.AE.indexOf(IN, 0) - 1) - 64,
          this.AE.charCodeAt(this.AE.indexOf(IN, 0) + IN.length) - 64,
        ],
      };
      spirit.I?.push(IN);
      if (Object(spirit.T)[IN].S.length >= 1) this.FACE(Object(spirit.T)[IN]);
      this.E.set(spirit.S, spirit);
      this.E.set(IN, Object(spirit.T)[IN]);
    }
    return this.E.get(IN) as SPIRIT;
  }
  //
  public ACE(string: string): Waters {
    this.AE = this.AE.concat(string);
    return this;
  }
}
