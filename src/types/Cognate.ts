import { ScriptureReference } from "./Scripture";
import { WATERS } from "./wordActions/Waters";
import { God } from "./wordActions/God";

export interface CognateIn {
  remap: boolean;
  GOD: God;
  T?: ScriptureReference;
  P?: WATERS;
}

export class Cognate {
  constructor(public IN: CognateIn) {}
}
