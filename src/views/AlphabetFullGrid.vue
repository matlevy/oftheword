<template>
  <div class="alphabet-map-view">
    <!-- <h1>Full Alphabet Grid</h1>
    <div class="notes">
      <p>
        As discussed previously, it is possible to divide the Alphabet into
        principal, abstract sections of concious experience: by vowel;
      </p>
      <p>
        Applying the divisions, the first occurance of a given letter is
        observed, and the preceeding two letters mapped to rows one [A] and two
        [B]: succeeding of the first occurance are placed vertically, providing
        each column with a number of letters representative to the count of
        those within the alphabet;
      </p>
      <p>
        This provides the following grid: again mapped vertically by the
        divisions of the alphabet: providing a form of cross-reference;
      </p>
      <p>
        The "natural word", to which we write, is contructed of letters in row
        [C];
      </p>
    </div> -->
    <div class="filters">
      <input
        placeholder="Enter A Custom Word"
        v-model="customHorizontal"
        size="30"
        max="26"
      />
      <input placeholder="Filter Columns" v-model="cFilter" size="15" />
      <select v-model="searchRow" class="search-letters">
        <option v-for="(letter, index) in searchLetters" v-bind:key="index">
          {{ letter }}
        </option>
      </select>
      <input placeholder="Filter Row" v-model="rFilter" size="15" />
      <input placeholder="Only Colour" v-model="colorFilter" size="15" />
      <span>
        <button v-if="chosenLetters.length > 0" @click="onPickSpelling">
          <span v-for="(el, index) in chosenLetters" v-bind:key="index">{{
            el.P.IN.E
          }}</span>
        </button>
        <button v-if="chosenLetters.length > 0 || appliedSpelling.length > 0">
          <font-awesome-icon
            class="trash"
            icon="fa-solid fa-trash-can"
            @click="resetChosenLetters"
          />
        </button>
      </span>
    </div>
    <AlphaBetMap
      @letterPick="onLetterPick"
      @pickRow="onRowPick"
      :gridSpelling="appliedSpelling"
      :inputH="customHorizontal"
      :inputHSearchSource="searchRow"
      :inputV="customVertical"
      :rowFilter="rFilter"
      :colFilter="cFilter"
      :showLetterCrossReference="true"
      :onlyColour="colorFilter"
      :showTally="true"
      :allowNumberFocus="true"
      :showTallyLetters="true"
    ></AlphaBetMap>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { Letter } from "@/types/Letter";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import AlphaBetMap, {
  GridLetterChoice,
} from "@/components/letter/AlphabetMap.vue";

@Options({
  name: "alphabet-full-grid",
  components: {
    AlphaBetMap,
    FontAwesomeIcon,
  },
})
export default class AlphabetFullGrid extends Vue {
  private columnFilter = "";
  private rowFilter = "";
  private customV = "";
  private customH = "";
  private searchR = "C";
  private colFilter = "";
  //
  public chosenLetters: Array<{ P: Letter; I: number; C: number }> = [];
  //
  public searchLetters: string[] = [
    ...Root.getInstance().IN.O.G.getAllAsString(),
  ];
  public appliedSpelling: Array<{ P: Letter; I: number; C: number }> = [];
  //
  public onRowPick(selection: string) {
    this.customH = selection;
    this.resetChosenLetters();
  }
  //
  public get colorFilter() {
    return this.colFilter;
  }
  public set colorFilter(value: string) {
    this.colFilter = value.toUpperCase();
  }
  //
  public get cFilter(): string {
    return this.columnFilter;
  }
  //
  public set cFilter(value: string) {
    this.columnFilter = value.toLocaleUpperCase();
  }
  //
  public get rFilter(): string {
    if (!this.rowFilter) return "";
    return this.rowFilter;
  }
  //
  public set rFilter(value: string) {
    this.rowFilter = value.toLocaleUpperCase();
  }
  //
  public get customHorizontal(): string {
    if (!this.customH) return "";
    return this.customH;
  }
  //
  public set customHorizontal(value: string) {
    this.customH = value.toLocaleUpperCase();
  }
  //
  public get customVertical(): string {
    if (!this.customV) return "";
    return this.customV;
  }
  //
  public set customVertical(value: string) {
    this.customV = value.toLocaleUpperCase();
  }
  //
  public set searchRow(value: string) {
    this.searchR = value.toLocaleUpperCase();
  }
  //
  public get searchRow(): string {
    return this.searchR;
  }
  //
  public onLetterPick(e: GridLetterChoice) {
    this.chosenLetters.push(e);
  }
  //
  public resetChosenLetters() {
    this.chosenLetters = [];
    this.appliedSpelling = [];
  }
  //
  public onPickSpelling() {
    this.appliedSpelling = this.chosenLetters;
    this.chosenLetters = [];
  }
}
</script>
<style lang="scss" scoped>
.alphabet-map-view {
  text-align: left;
  color: white;
  margin: 1rem;
  max-width: 1000px;
  margin-bottom: 2rem !important;
}
.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
button {
  cursor: pointer;
}
button,
select,
input {
  background: transparent;
  padding: 0.5rem;
  border: none;
  color: white;
  margin-right: 1rem;
  margin-bottom: 1rem;
  outline: 1px dotted rgba(255, 255, 255, 0.2);
}
</style>
