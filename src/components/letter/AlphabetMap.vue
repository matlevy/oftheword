<template>
  <div class="alphabet-view">
    <div
      class="alphabet-grid"
      :class="{ ['borderContainer']: borderContainer }"
    >
      <div class="column column-label" v-if="!noColumnLabel">
        <div class="row" v-for="(L, I) in filteredRow(letters)" v-bind:key="I">
          <letter-renderer
            :class="{
              ['lowerBorder']: hasDivider(letters[I]),
              ['hiddenBorder']: !hasDivider(letters[I]),
            }"
            :letter="L"
            :colours="true"
            class="alphabet-letter"
          ></letter-renderer>
        </div>
      </div>
      <div
        class="column"
        :class="{ ['rightBorder']: hasDivider(C) }"
        v-for="(C, X) in filteredColumn(alphabet.A)"
        v-bind:key="X"
      >
        <div class="row" v-for="(A, Y) in filteredRow(C.FAC)" v-bind:key="Y">
          <letter-renderer
            :class="{
              ['lowerBorder']: hasDivider(letters[Y]),
              ['hiddenBorder']: !hasDivider(letters[Y]),
              ['unHighlightLetter']: unHiglightLetter(A),
              ['whiteOnly']: colorOnly(A),
            }"
            :viewAsNumbers="viewGridLettersAsNumbers"
            :letter="A"
            :colours="true"
            class="alphabet-letter"
          ></letter-renderer>
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
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { Root } from "@/root";
import { Letter } from "@/types/Letter";

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import LetterRenderer from "./LetterRenderer.vue";

@Options({
  components: {
    ScriptureMapRenderer,
    LetterRenderer,
  },
  props: {
    triad: TripletMap,
    gridView: Boolean,
    scripture: Scripture,
    rowFilter: String,
    colFilter: String,
    input: String,
    higlight: String,
    noColumnLabel: Boolean,
    noDivisions: Boolean,
    onlyColour: String,
    allowToggle: Boolean,
    borderContainer: Boolean,
  },
})
export default class AlphaBetMap extends Vue {
  public TO: TripletMappingDirection = TripletMappingDirection.BAC;
  public UT: TripletMappingDirection = TripletMappingDirection.CAB;
  public RO: TripletMappingDirection = TripletMappingDirection.ACB;
  public ROOT: Root = Root.getInstance();
  public search = "";
  public triad!: TripletMap;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  public rowFilter!: string;
  public colFilter!: string;
  public higlight!: string;
  public input!: string;
  public noDivisions!: boolean;
  public noColumnLabel!: boolean;
  public onlyColour!: string;
  public viewGridLettersAsNumbers = false;
  public allowToggle!: boolean;
  public borderContainer!: boolean;
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
  constructor(...args: unknown[]) {
    super(args);
  }
  //
  public get stream(): string {
    if (this.input) {
      return this.input;
    }
    return this.GOD.IN.G.getAllAsString();
  }
  //
  public get alphabet(): Word {
    this.scripture.read(this.stream.concat(" "));
    return this.scripture.I[0];
  }
  //
  public get letters(): Letter[] {
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
  public colorOnly(letter: Letter) {
    if (this.onlyColour) {
      return this.onlyColour.indexOf(letter.IN.E) == -1;
    }
    return false;
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
  border-top: 1px solid rgb(15, 15, 15);
}
.alphabet-letter {
  margin: 0rem;
  padding: 0.5rem;
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
</style>
