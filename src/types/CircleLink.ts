import { GlyphCircleReference } from "./CircleReference";

export class CircleLink {
  constructor(public point: GlyphCircleReference, public count = 1) {}

  public increment() {
    this.count += 1;
  }
}
