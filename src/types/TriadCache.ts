/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Store } from "./interfaces/Store";
import { Triad, TriadIn } from "./Triad";

export class TriadCache implements Store<TriadIn, TriadIn, TriadIn> {
  public O: Map<string, unknown> = new Map<string, unknown>();

  public get<R>(value: TriadIn): R {
    const key: string = value
      .a!.character.concat(value.b!.character)
      .concat(value.c!.character);
    return this.O.get(key) as R;
  }

  public store<R>(value: TriadIn): R {
    if (this.get<R>(value)) {
      return this.get<R>(value);
    } else {
      const k: string = value
        .a!.character.concat(value.b!.character)
        .concat(value.c!.character);
      this.O.set(k, new Triad(value));
      return this.get<R>(value);
    }
  }
}
