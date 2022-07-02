import { CacheStore } from "./interfaces/CacheStore";
import { Triad, TriadIn, TriGlyph } from "./Triad";

export class TriadCache implements CacheStore<TriadIn, TriGlyph> {
  public O: Map<string, any> = new Map<string, any>();

  public get<R>(value: TriadIn): R {
    const key: string = value.a.character
      .concat(value.b.character)
      .concat(value.c.character);
    return this.O.get(key) as R;
  }

  public store<R>(value: TriadIn): R {
    if (this.get<R>(value)) {
      return this.get<R>(value);
    } else {
      const k: string = value.a.character
        .concat(value.b.character)
        .concat(value.c.character);
      this.O.set(k, new Triad(value));
      return this.get<R>(value);
    }
  }
}
