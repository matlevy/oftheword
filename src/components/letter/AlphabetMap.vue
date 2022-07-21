<template>
  <div class="alphabet-view">
    <div
      class="alphabet-grid"
      :class="{ ['borderContainer']: borderContainer }"
    >
      <div class="column column-label" v-if="!noColumnLabel">
        <letter-renderer
          v-for="(L, I) in filteredRow(letters)"
          v-bind:key="I"
          :class="{
            ['lowerBorder']: hasDivider(letters[I]),
            ['hiddenBorder']: !hasDivider(letters[I]),
          }"
          :showAsShape="showOnlyColor"
          :letter="L"
          :colours="true"
          class="row alphabet-letter"
        ></letter-renderer>
      </div>
      <div class="rows">
        <div>
          <div class="column" v-for="(C, X) in matrix" v-bind:key="X">
            <letter-renderer
              v-for="(A, Y) in filteredRow(C)"
              v-bind:key="Y"
              :class="{
                ['lowerBorder']: hasDivider(letters[Y]),
                ['hiddenBorder']: !hasDivider(letters[Y]),
                ['unHighlightLetter']: unHiglightLetter(A),
                ['whiteOnly']: colorOnly(A),
              }"
              :showAsShape="showOnlyColor"
              :viewAsNumbers="viewGridLettersAsNumbers"
              :letter="A"
              :colours="true"
              @click="onLetterPick({ P: A, I: X, C: Y })"
              class="row alphabet-letter"
            ></letter-renderer>
          </div>
        </div>
        <div v-if="showColumnLetterAtBottom">
          <letter-renderer
            v-for="(L, I) in filteredColumn(letters.slice(0, stream.length))"
            v-bind:key="I"
            :showAsShape="showOnlyColor"
            :letter="getNumberAsAlphabetLetter(I)"
            :colours="true"
            class="column alphabet-letter"
          ></letter-renderer>
        </div>
      </div>
      <div class="column column-label search-col" v-if="canSubNav">
        <div class="row" v-for="(L, I) in filteredRow(letters)" v-bind:key="I">
          <font-awesome-icon
            class="search"
            icon="fa-solid fa-arrows-turn-to-dots"
            @click="place(I)"
          />
        </div>
      </div>
    </div>
    <div class="controls-and-notes" v-if="allowToggle">
      <span
        v-if="canToggleNumberView"
        class="toggle-numbers"
        @click="toggleNumbers()"
        >{{ toggleNumbersLabel() }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { WordMap } from "@/types/WordMap";
import { Word } from "@/types/Word";
import { God } from "@/types/wordActions/God";
import { TripletMap } from "@/types/TripletMap";
import { Root } from "@/root";
import { Letter } from "@/types/Letter";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import LetterRenderer from "./LetterRenderer.vue";

export interface GridLetterChoice {
  P: Letter;
  I: number;
  C: number;
}

export interface GridCrossReference {
  R: string;
  C: string;
}

@Options({
  components: {
    ScriptureMapRenderer,
    LetterRenderer,
    FontAwesomeIcon,
  },
  props: {
    triad: TripletMap,
    gridView: Boolean,
    scripture: Scripture,
    rowFilter: String,
    colFilter: String,
    inputH: String,
    inputHSearchSource: String,
    inputV: String,
    higlight: String,
    noColumnLabel: Boolean,
    noDivisions: Boolean,
    onlyColour: String,
    allowToggle: Boolean,
    borderContainer: Boolean,
    gridSpelling: Array,
    showOnlyColor: Boolean,
    showColumnLetterAtBottom: Boolean,
    colCountOffset: Number,
    cuts: Array,
  },
})
export default class AlphaBetMap extends Vue {
  public ROOT: Root = Root.getInstance();
  public search = "";
  public triad!: TripletMap;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  public rowFilter!: string;
  public colFilter!: string;
  public higlight!: string;
  public inputH!: string;
  public inputV!: string;
  public noDivisions!: boolean;
  public noColumnLabel!: boolean;
  public onlyColour!: string;
  public viewGridLettersAsNumbers = false;
  public allowToggle!: boolean;
  public borderContainer!: boolean;
  public inputHSearchSource!: string;
  public gridSpelling!: Array<GridLetterChoice>;
  public showOnlyColor!: boolean;
  public showColumnLetterAtBottom!: boolean;
  public colCountOffset!: number;
  public cuts!: number[];
  //
  public GOD: God = new God({
    OD: this.wordMap,
    O: this.triad,
    GO: this.ROOT.IN.O.IN.GO,
    G: this.ROOT.IN.O.IN.G,
    X: this.ROOT.IN.O.IN.X,
  });
  public scripture: Scripture = new Scripture({
    GOD: this.GOD,
    map: false,
  });
  //
  public get stream(): string {
    if (this.crossReference && this.crossReference.C.length > 0)
      return this.crossReference.C;
    if (this.inputH) {
      return this.inputH;
    }
    return this.GOD.IN.G.getAllAsString();
  }
  public get canSubNav(): boolean {
    if (!this.columnFilter || !this.inputH) return false;
    return (
      this.columnFilter.length > 0 ||
      (this.inputH && this.inputH.length > 0) ||
      false
    );
  }
  //
  public get at(): string[] {
    if (this.crossReference && this.crossReference.C.length > 0)
      return [...this.crossReference.C];
    if (this.inputH) {
      return [...this.inputH];
    }
    return [...this.GOD.IN.G.getAllAsString()];
  }
  //
  public get columnFilter(): string {
    if (this.crossReference && this.crossReference.C.length > 0)
      return this.crossReference.C;
    return this.colFilter;
  }
  //
  public get matrix(): Array<Letter[]> {
    return this.at
      .map((v: string) => this.GOD.IN.G.getLetter(v).FAC)
      .filter((v: Letter[]) => {
        const rowString = v.map((l: Letter) => l.IN.E).join("");
        const Q = new RegExp(`[${this.columnFilter}]`, "gm");
        const P = this.GOD.G.getAllAsString().indexOf(this.inputHSearchSource);
        if (this.columnFilter) {
          const T = [...rowString.matchAll(Q)].map(
            (p: RegExpMatchArray) => p.index
          );
          return T.indexOf(P) >= 0;
        }
        return true;
      });
  }
  //
  public place(selection: number) {
    const row = this.matrix
      .map((c: Letter[]) => {
        return c.find((v: Letter, i: number) => i == selection)?.IN.E;
      })
      .join("");
    this.$emit("pick-row", row);
  }
  //
  public getNumberAsAlphabetLetter(index: number): Letter {
    const offset = this.colCountOffset ? this.colCountOffset : 0;
    const pos = (index + offset) % 26;
    let cut = 0;
    if (this.cuts) {
      cut = this.cuts.filter((v) => v <= index).reduce((p, c) => c, 0);
      if (cut == 0) {
        return this.GOD.G.getFromIndex(pos + 1);
      }
      return this.GOD.G.getFromIndex(index - cut + 1);
    }
    return this.GOD.G.getFromIndex(pos + 1);
  }
  //
  public get alphabet(): Word {
    this.scripture.read(this.stream.concat(" "));
    return this.scripture.I[0];
  }
  //
  public get letters(): Letter[] {
    if (this.inputV) {
      return [...this.inputV].map((v: string) => {
        console.log(Root.getInstance().IN.O.G.getLetter(v));
        return Root.getInstance().IN.O.G.getLetter(v);
      });
    }
    return [...Root.getInstance().IN.O.G.getAllAsString()].map((v: string) =>
      Root.getInstance().IN.O.G.getLetter(v)
    );
  }
  //
  public get canToggleNumberView(): boolean {
    if (this.allowToggle) return true;
    return false;
  }
  //
  public hasDivider(letter: Letter) {
    if (this.noDivisions) return false;
    return [..."AEIOU"].indexOf(letter.IN.E) != -1;
  }
  //
  public unHiglightLetter(letter: Letter): boolean {
    if (this.higlight) {
      return this.higlight.indexOf(letter.IN.E) == -1;
    }
    return false;
  }
  //
  public filteredRow(letters: Letter[]) {
    return letters.filter((letter: Letter, index: number) => {
      const rowLetter = Root.getInstance().IN.O.G.getAllAsString()[index];
      if (this.rowFilter && this.rowFilter.length > 0) {
        return this.rowFilter.indexOf(rowLetter) >= 0;
      }
      return true;
    });
  }
  //
  public filteredColumn(letters: Letter[]) {
    return letters.filter((letter: Letter, index: number) => {
      const rowLetter = this.stream[index];
      if (this.colFilter && this.colFilter.length > 0) {
        return this.colFilter.indexOf(rowLetter) >= 0;
      }
      return true;
    });
  }
  //
  public colorOnly(letter: Letter) {
    if (this.onlyColour) {
      return this.onlyColour.indexOf(letter.IN.E) == -1;
    }
    return false;
  }
  //
  public toggleNumbers() {
    this.viewGridLettersAsNumbers = this.viewGridLettersAsNumbers
      ? false
      : true;
  }
  //
  public toggleNumbersLabel(): string {
    return !this.viewGridLettersAsNumbers
      ? "View As Numbers & Colours In Grid"
      : "View As Letters In Grid";
  }
  //
  public onLetterPick(choice: GridLetterChoice) {
    this.$emit("letterPick", choice);
  }
  //
  public get crossReference(): GridCrossReference {
    if (this.gridSpelling) {
      return this.gridSpelling.reduce<GridCrossReference>(
        (p: GridCrossReference, v: GridLetterChoice) => {
          if (p.C.indexOf(this.stream.charAt(v.I)) == -1)
            p.C = p.C.concat(this.stream.charAt(v.I));
          return p;
        },
        {
          R: "",
          C: "",
        }
      );
    }
    return {
      C: "",
      R: "",
    };
  }
}
</script>
<style lang="scss" scoped>
.column {
  float: left;
}
.row {
  display: flex;
  flex-direction: row;
}
.rows {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
}
.column-label {
  border-right: 1px dotted rgba(255, 255, 255, 0.2);
}
.rightBorder {
  border-left: 1px dotted rgba(255, 255, 255, 0.2);
}
.lowerBorder {
  border-top: 1px dotted rgba(255, 255, 255, 0.2);
}
.hiddenBorder {
  border-top: 1px solid rgb(25, 25, 25);
}
.alphabet-letter {
  margin: 0rem;
  padding: 0.5rem;
  text-align: center;
  align-content: center;
  justify-content: center;
}
.unHighlightLetter {
  opacity: 0.2;
}
.whiteOnly {
  color: white;
}
.toggle-numbers {
  font-size: 0.6rem;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.2rem;
}
.controls-and-notes {
  display: flex;
  margin-top: 1rem;
}
.alphabet-view {
  display: flex;
  flex-flow: column;
}
.alphabet-grid {
  display: flex;
  flex-flow: row;
}
.borderContainer {
  border: 1px dotted rgba(255, 255, 255, 0.2);
}
.search-col {
  border: 1px dotted rgba(255, 255, 255, 0.2);
}
.search {
  min-height: 15px;
  max-height: 15px;
  padding: 12px;
  opacity: 0.5;
  cursor: pointer;
}
</style>
