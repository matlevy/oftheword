import { Root } from "./root";
import { Scripture } from "./types/Scripture";
import { Triad } from "./types/Triad";

export default class Helpers {
  public crossReferenceTriad(triad: Triad, crossReferences: Array<Scripture>) {
    if (triad && triad.P) {
      const book: number = Math.floor(triad.P / 100000000);
      const chapter: number = Math.floor(
        (triad.P - book * 100000000) / 1000000
      );
      const verse: number = Math.floor(
        (triad.P - book * 100000000 - chapter * 1000000) / 1000
      );
      const index = Number(
        triad.P.toString().slice(triad.P.toString().length - 3)
      );
      if (chapter && verse) {
        const cr: Scripture =
          Root.getInstance().gen.chapters[chapter - 1].verse[verse - 1];
        crossReferences = [];
        crossReferences.push(cr);
      }
    }
  }
}
