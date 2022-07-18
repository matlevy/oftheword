<template>
  <div class="alphabet-view">
    <scripture-map-renderer
      :input="search"
      :map-direction="TO"
      :word-border="false"
      :scripture="scripture"
    ></scripture-map-renderer>
    <scripture-map-renderer
      :input="search"
      :map-direction="RO"
      :word-border="false"
      :scripture="scripture"
    ></scripture-map-renderer>
    <scripture-map-renderer
      :input="search"
      :map-direction="UT"
      :word-border="false"
      :scripture="scripture"
    ></scripture-map-renderer>
    <!-- <input v-model="search" width="50" /> -->
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

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";

@Options({
  name: "alphabet-map",
  components: {
    ScriptureMapRenderer,
  },
  props: {
    triad: TripletMap,
    gridView: Boolean,
    scripture: Scripture,
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
  private GOD: God = new God({
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
    this.scripture.read(this.GOD.IN.G.getAllAsString().concat(" "));
    console.log(this.scripture);
  }
  //
  public mounted() {
    this.$watch("search", (v: string) => {
      console.log(this.aSearch(v));
    });
  }
  //
  public aSearch(value: string) {
    return this.scripture.IN.GOD.IN.GO?.FACE({
      S: value,
      P: -1,
      T: {},
    });
  }
}
</script>
