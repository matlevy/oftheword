<template>
  <div class="alphabet-map-view">
    <div class="filters">
      <input
        placeholder="1. Type a Word"
        v-model="customHorizontal"
        size="30"
        max="26"
      />
      <input
        placeholder="2. Crossreference With"
        v-model="verticalLetters"
        size="30"
        max="26"
      />
      <input placeholder="Look for" v-model="cFilter" size="10" />
      <select v-model="searchRow" class="search-letters">
        <option v-for="(letter, index) in searchLetters" v-bind:key="index">
          {{ letter }}
        </option>
      </select>
      <input placeholder="Only Colour" v-model="colorFilter" size="10" />
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
      @focusLetter="onFocusForm"
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
      :columnLetters="verticalLetters"
    ></AlphaBetMap>
    <div class="forms" :class="[formsVisiblityClass]">
      <div class="forms-buttons">
        <button
          class="form-focus-button"
          :class="[formFocusButtonClass]"
          @click="toggleForms"
        >
          {{ focusedForm }}
        </button>
      </div>
      <div class="forms-details">
        <div class="notes">
          <p>
            Connecting to the selected position of the letter
            <span class="letters-marker">{{ focusedForm }}</span
            >, from the alphabet, we can see the following
            <router-link :to="{ name: 'genesis-opening' }">form</router-link>
            highlighted;
          </p>
        </div>
        <div class="filters">
          <input placeholder="Filter Row" v-model="formFilters" size="15" />
          <input
            placeholder="Only Colour"
            v-model="formsColourFilters"
            size="15"
          />
        </div>
        <AlphaBetMap
          class="grid"
          :showOnlyColor="false"
          :inputH="form"
          :showLetterCrossReference="true"
          :colCountOffset="4"
          :showIndexValues="false"
          :showTally="true"
          :allowNumberFocus="true"
          :showTallyLetters="true"
          :rowFilter="formFilters"
          :onlyColour="formsColourFilters"
        ></AlphaBetMap>
      </div>
    </div>
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
  private formFocus = Root.getInstance().IN.O.G.getFromIndex(3).IN.E;
  private fmFilter = "";
  private fmColorFilter = "";
  private vLetters = "";
  //
  public formsAreVisible = false;
  //
  public toggleForms() {
    this.formsAreVisible = this.formsAreVisible == true ? false : true;
  }
  //
  public get formsVisiblityClass() {
    return this.formsAreVisible ? "in-view" : "";
  }
  //
  public mounted() {
    if (this.$route.params.stream) {
      this.customHorizontal = this.$route.params.stream as string;
    }
  }
  //
  private root = Root.getInstance();
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
  public get verticalLetters() {
    return this.vLetters;
  }
  public set verticalLetters(value: string) {
    this.vLetters = value.toLocaleUpperCase();
  }
  //
  public get formFilters() {
    return this.fmFilter;
  }
  public set formFilters(value: string) {
    this.fmFilter = value.toUpperCase();
  }
  //
  public get formsColourFilters() {
    return this.fmColorFilter;
  }
  public set formsColourFilters(value: string) {
    this.fmColorFilter = value.toUpperCase();
  }
  //
  public get colorFilter() {
    return this.colFilter;
  }
  public set colorFilter(value: string) {
    this.colFilter = value.toUpperCase();
  }
  //
  public get focusedForm() {
    return this.formFocus;
  }
  //
  public get form() {
    const num = this.root.IN.O.G.getAllAsString().indexOf(this.formFocus);
    return this.root.IN.O.IN.GO?.getForm(num + 1);
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
  //
  public onFocusForm(letter: string) {
    this.formFocus = letter;
  }
  //
  public get formFocusButtonClass() {
    return Root.getInstance().IN.O.G.getPresenterClass(
      Root.getInstance().IN.O.G.getLetter(this.formFocus || "*")
    );
  }
}
</script>
<style lang="scss" scoped>
.alphabet-map-view {
  text-align: left;
  color: white;
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
.forms {
  position: fixed;
  top: 0;
  //right: -400px;
  z-index: 1000;
  background-color: rgb(25, 25, 25);
  width: 900px;
  display: flex;
  flex-direction: row;
  padding-top: 1em;
  right: calc(-900px + 2em);
  transition: right 0.2s ease-in;
  overflow: scroll;
  min-height: 100vh;
  &.in-view {
    right: 0;
  }
  filter: drop-shadow(0 10px 2px rgb(50, 50, 50));
}
.forms-buttons {
  .form-focus-button {
    border: none;
    margin: 0;
    outline: none;
    font-weight: bold;
    min-width: 3em;
    &.letter-a {
      background-color: red;
      color: black;
    }
    &.letter-e {
      background-color: limegreen;
      color: black;
    }
    &.letter-i {
      background-color: rgb(0, 132, 255);
      color: black;
    }
    &.letter-o {
      background-color: yellow;
      color: black;
    }
    &.letter-u {
      background-color: rgb(193, 0, 223);
      color: black;
    }
  }
}
</style>
