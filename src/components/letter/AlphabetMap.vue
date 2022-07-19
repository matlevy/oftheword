<template>
  <div class="alphabet-view">
    <div class="column column-label">
      <div class="row" v-for="(L, I) in letters" v-bind:key="I">
        <letter-renderer
          :class="{ ['lowerBorder']: hasDivider(I) }"
          :letter="L"
          :colours="true"
          class="alphabet-letter"
        ></letter-renderer>
      </div>
    </div>
    <div
      class="column"
      :class="{ ['rightBorder']: hasDivider(X) }"
      v-for="(C, X) in alphabet.A"
      v-bind:key="X"
    >
      <div class="row" v-for="(A, Y) in C.FAC" v-bind:key="Y">
        <letter-renderer
          :class="{ ['lowerBorder']: hasDivider(Y) }"
          :letter="A"
          :colours="true"
          class="alphabet-letter"
        ></letter-renderer>
      </div>
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

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import LetterRenderer from "./LetterRenderer.vue";
import { Letter } from "@/types/Letter";

@Options({
  components: {
    ScriptureMapRenderer,
    LetterRenderer,
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
  //
  public get alphabet(): Word {
    return this.scripture.I[0];
  }
  //
  public get letters(): Letter[] {
    return [...Root.getInstance().IN.O.G.getAllAsString()].map((v: string) =>
      Root.getInstance().IN.O.G.getLetter(v)
    );
  }
  //
  public hasDivider(index: number) {
    return [4, 8, 14, 20, 26].indexOf(index) != -1;
  }
}
</script>
<style lang="scss" scoped>
.column {
  display: inline-block;
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
.alphabet-letter {
  margin: 0rem;
  padding: 0.5rem;
}
</style>
