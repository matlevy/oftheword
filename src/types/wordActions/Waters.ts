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

    const P = spirit.P < 0 ? this.AE.indexOf(spirit.S, 0) : spirit.P;

    if (P > -1) {
      spirit.P = this.AE.indexOf(spirit.S, 0);

      let R = spirit.S.length - 1;
      let I = spirit.S.slice(0, R);

      while (I.length >= 2) {
        const PI = this.AE.indexOf(I, 0);
        if (PI != -1 && PI != spirit.P) break;
        R--;
        I = spirit.S.slice(0, R);
      }

      if (I.length >= 1) {
        const A: string = I;
        const B: string = spirit.S.replace(I, "");
        this.ATE(spirit, A);
        this.ATE(spirit, B);
      }
    } else {
      // Term not found, start dividing the word into chunks, starting
      // with two letters;
      let R = 2;
      let I = spirit.S.slice(0, R);
      while (R < I.length) {
        const PI = this.AE.indexOf(I, 0);
        if (PI != -1) break;
        R++;
        I = spirit.S.slice(0, R);
      }
      Object(spirit.T)[I] = this.moveUponTheFace({ S: I, P: -1, T: {} });
      if (I) {
        // Cut and search the remainder
        R = spirit.S.length - 1;
        I = spirit.S.replace(I, "");
        while (I.length >= 2) {
          const PI = this.AE.indexOf(I, 0);
          if (PI != -1 && PI != spirit.P) break;
          R--;
          I = I.slice(0, R);
        }
        Object(spirit.T)[I] = this.moveUponTheFace({ S: I, P: -1, T: {} });
      }
    }
    return spirit;
  }
  //
  public ATE(spirit: SPIRIT, IN: string): SPIRIT {
    const SPIRIT: SPIRIT = this.E.get(IN) as SPIRIT;

    if (SPIRIT) {
      Object(spirit.T)[IN] = this.E.get(IN) as SPIRIT;
      return spirit;
    }

    if (Object(spirit.T)[IN] == undefined) Object(spirit.T)[IN] = {};

    Object(spirit.T)[IN] = { S: IN, P: this.AE.indexOf(IN, 0), T: {} };

    this.E.set(IN, { S: IN, P: this.AE.indexOf(IN, 0), T: {} });

    if (Object(spirit.T)[IN].S.length > 1)
      this.moveUponTheFace(Object(spirit.T)[IN]);

    this.E.set(IN, spirit);

    return this.E.get(IN) as SPIRIT;
  }
  //
  public append(string: string): Waters {
    this.AE = this.AE.concat(string);
    return this;
  }
}
