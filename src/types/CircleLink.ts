import { TripletMapPoint } from "@/types/TripletMapPoint";

export class CircleLink {
  constructor(public point: TripletMapPoint, public count = 1) {}

  public increment() {
    this.count += 1;
  }
}
