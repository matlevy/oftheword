import { Glyph } from "./Glyph";
import { Triad, TriGlyph } from "./Triad";

export interface TriadViewIn {
  O: Triad;
  S: string;
}

export class TriadViewFacade implements TriGlyph {
  constructor(public IN: TriadViewIn) {}

  get a(): Glyph {
    return this.IN.O.a;
  }

  get b(): Glyph {
    return this.IN.O.b;
  }

  get c(): Glyph {
    return this.IN.O.c;
  }

  public get P(): number {
    return this.IN.O.P;
  }

  get AD(): Array<Glyph> {
    return this.IN.O.AD;
  }

  get IS(): boolean {
    return this.IN.S.indexOf(this.b.character) != -1;
  }
}
