<template>
  <div class="alphabet-view">
    <scripture-map-renderer :scripture="scripture"></scripture-map-renderer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { WordMap } from "@/types/WordMap";
import { Word } from "@/types/Word";
import { GlyphMapLatin } from "@/types/GlyphMapLatin";
import { God } from "@/types/wordActions/God";
import { TriadMap } from "@/types/TriadMap";

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import { GlyphMapSpecial } from "@/types/GlyphMapSpecial";

@Options({
  name: "alphabet-map",
  components: {
    ScriptureMapRenderer,
  },
  props: {
    triad: TriadMap,
    gridView: Boolean,
    scripture: Scripture,
  },
})
export class AlphaBetMap extends Vue {
  public triad!: TriadMap;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  private GOD: God = new God({
    OD: this.wordMap,
    O: this.triad,
    G: GlyphMapLatin.getInstance(),
    X: GlyphMapSpecial.getInstance(),
  });
  public scripture: Scripture = new Scripture({
    GOD: this.GOD,
    map: false,
  });
  //
  constructor(...args: any[]) {
    super(args);
    this.scripture.read(this.GOD.IN.G.getAllAsString());
  }
}
</script>
