<template>
  <div class="alphabet-map-view">
    <h1>Full Alphabet Grid</h1>
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
    </div>
    <div class="filters">
      <input
        placeholder="Enter Letters"
        v-model="customHorizontal"
        size="30"
        max="26"
      />
      <input placeholder="Col Letters" v-model="cFilter" size="15" />
      <select v-model="searchRow" class="search-letters">
        <option v-for="(letter, index) in searchLetters" v-bind:key="index">
          {{ letter }}
        </option>
      </select>
      <input placeholder="Filter Row" v-model="rFilter" size="15" />
    </div>
    <AlphaBetMap
      :inputH="customHorizontal"
      :inputHSearchSource="searchRow"
      :inputV="customVertical"
      :rowFilter="rFilter"
      :colFilter="cFilter"
    ></AlphaBetMap>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import { Root } from "@/root";

@Options({
  name: "alphabet-full-grid",
  components: {
    AlphaBetMap,
  },
})
export default class AlphabetFullGrid extends Vue {
  private columnFilter = "";
  private rowFilter = "";
  private customV = "";
  private customH = "";
  private searchR = "C";
  //
  public searchLetters: string[] = [
    ...Root.getInstance().IN.O.G.getAllAsString(),
  ];
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
