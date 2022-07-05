import { ScriptureReference } from "./Scripture";

export interface ReferencePoint {
  scripture?: ScriptureReference;
  found?: Array<ReferenceResult>;
  next?: ReferencePoint;
}

export interface ReferenceResult {
  index: number;
  length: number;
  match: string;
  wide: string;
  pair: string;
  end: number;
}

export interface Reference {
  search(string: string): ReferencePoint;
  append(string: string, scripture: ScriptureReference): ReferencePoint;
}

export class FullReference implements Reference {
  public O = "";

  public search(
    string: string,
    right?: string,
    p?: ReferencePoint
  ): ReferencePoint {
    const s = string.toUpperCase();
    if (s.length == 0) {
      return {};
    }
    const pt: ReferencePoint = p || {
      found: [],
    };
    const pos = this.O.indexOf(s);
    if (pos != -1) {
      const existing: ReferenceResult | undefined = pt.found!.find(
        (v: ReferenceResult) => v.index == pos || v.end == pos + s.length
      );
      if (existing && existing.match.length < s.length) {
        existing.length = s.length;
        existing.match = s;
        existing.end = pos + s.length;
        existing.wide = this.O.slice(pos - 1, pos + s.length + 1);
        existing.pair = this.O.slice(pos - 1, pos + s.length + 1).replace(
          s,
          ""
        );
      } else if (!existing) {
        pt.found!.push({
          length: s.length,
          index: pos,
          end: pos + s.length,
          match: s,
          wide: this.O.slice(pos - 1, pos + s.length + 1),
          pair: this.O.slice(pos - 1, pos + s.length + 1).replace(s, ""),
        });
      }
    }
    if (s.length > 2) {
      this.search(s.slice(0, s.length - 1), s.charAt(s.length - 1), pt);
      this.search(s.slice(1), s.charAt(0), pt);
    }
    pt.found = pt.found?.sort(
      (a: ReferenceResult, b: ReferenceResult) => a.index - b.index
    );
    return pt;
  }

  public append(string: string, scripture: ScriptureReference): ReferencePoint {
    scripture.P = this.end;
    this.O = this.O.concat(string);
    scripture.T = this.end;
    return {
      scripture,
    };
  }

  public get end(): number {
    return this.O.length - 1;
  }
}
