import { SPIRIT } from "./Spirit";

export interface WATERS {
  moveUponTheFace(spirit: SPIRIT): SPIRIT;
  append(string: string): Waters;
}

export class Waters implements WATERS {
  public AE = "";
  public E: Map<string, SPIRIT> = new Map<string, SPIRIT>();
  //
  public moveUponTheFace(spirit: SPIRIT): SPIRIT {
    spirit.S = spirit.S.toLocaleUpperCase();
    spirit.P = this.AE.indexOf(spirit.S, 0);
    spirit.I = spirit.I == undefined ? [] : spirit.I;
    if (this.E.get(spirit.S)) {
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
      };
      spirit.I?.push(IN);
      if (Object(spirit.T)[IN].S.length >= 1)
        this.moveUponTheFace(Object(spirit.T)[IN]);
      this.E.set(spirit.S, spirit);
      this.E.set(IN, Object(spirit.T)[IN]);
    }
    return this.E.get(IN) as SPIRIT;
  }
  //
  public append(string: string): Waters {
    this.AE = this.AE.concat(string);
    return this;
  }
}
