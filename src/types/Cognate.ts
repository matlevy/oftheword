import { ScriptureReference } from "./Scripture";
import { Reference } from "./SourceMap";
import { God } from "./wordActions/God";

export interface CognateIn {
  remap: boolean;
  GOD: God;
  T?: ScriptureReference;
  P?: Reference;
}

export class Cognate {
  constructor(public IN: CognateIn) {}
}
