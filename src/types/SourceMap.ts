import { ScriptureReference } from "./Scripture";

export interface ReferencePoint {
  scripture?: ScriptureReference;
  found?: Array<Reference>;
  next?: ReferencePoint;
}

export interface Reference {
  index: number;
  length: number;
  match: string;
  wide: string;
  pair: string;
  end: number;
}

export interface Map {
  search(
    string: string,
    right?: string,
    p?: ReferencePoint,
    seed?: string
  ): ReferencePoint;
  append(string: string, scripture: ScriptureReference): ReferencePoint;
}

export class SourceMap implements Map {
  public O = "";

  public search(
    string: string,
    right?: string,
    p?: ReferencePoint,
    seed?: string
  ): ReferencePoint {
    const s = string.toUpperCase();
    if (s.length == 0) {
      return {};
    }
    const pt: ReferencePoint = p || {
      found: [],
    };
    const S: string = seed ? seed : this.O;
    const pos = S.indexOf(s);
    if (pos != -1) {
      const existing: Reference | undefined = pt.found!.find(
        (v: Reference) => v.index == pos || v.end == pos + s.length
      );
      if (existing && existing.match.length < s.length) {
        existing.length = s.length;
        existing.match = s;
        existing.end = pos + s.length;
        existing.wide = S.slice(pos - 1, pos + s.length + 1);
        existing.pair = S.slice(pos - 1, pos + s.length + 1).replace(s, "");
      } else if (!existing) {
        pt.found!.push({
          length: s.length,
          index: pos,
          end: pos + s.length,
          match: s,
          wide: S.slice(pos - 1, pos + s.length + 1),
          pair: S.slice(pos - 1, pos + s.length + 1).replace(s, ""),
        });
      }
    }
    if (s.length > 2) {
      this.search(s.slice(0, s.length - 1), s.charAt(s.length - 1), pt, seed);
      this.search(s.slice(1), s.charAt(0), pt, seed);
    }
    pt.found = pt.found?.sort(
      (a: Reference, b: Reference) => a.index - b.index
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
