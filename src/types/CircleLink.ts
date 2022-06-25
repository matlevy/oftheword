import { TriadMapPoint } from "./TriadMapPoint";

export class CircleLink {
  constructor(public point: TriadMapPoint, public count = 1) {}

  public increment() {
    this.count += 1;
  }
}
