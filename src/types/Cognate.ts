import { God } from "./wordActions/God";
import { SPIRIT } from "./wordActions/Spirit";

export interface CognateIn {
  GOD: God;
  SPIRIT: SPIRIT;
}

export class Cognate {
  constructor(public IN: CognateIn) {}
}
