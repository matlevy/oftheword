import { Cognate, CognateIn } from "./Cognate";
import { Reference, ReferencePoint } from "./SourceMap";
import { Store } from "./interfaces/Store";
import { God } from "./wordActions/God";

export interface CognateStoreIn {
  GOD: God;
}

export class CognateStore implements Store<string, ReferencePoint, Cognate[]> {
  public O: Map<string, any> = new Map<string, CognateIn>();

  constructor(public IN: CognateStoreIn) {}

  public get<R>(value: string): R {
    return this.O.get(value) as R;
  }

  public store(value: ReferencePoint): Cognate[] {
    return value.found?.map((v: Reference) => {
      if (this.get<Cognate>(v.match)) {
        return this.get<Cognate>(v.match);
      }
      const COG: Cognate = new Cognate({
        GOD: this.IN.GOD,
        P: v,
        T: value.scripture!,
        remap: false,
      });
      console.log(v.match, v.index, v.length);
      this.O.set(v.match, COG);
      return this.get<Cognate>(v.match);
    }) as Cognate[];
  }
}
