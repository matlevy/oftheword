<template>
  <div>
    <div v-if="showInput">
      <input type="text" v-model="think" width="100" />
    </div>
    <scripture-map-renderer
      v-if="scripture"
      :mapDirection="mapDirection"
      :scripture="scripture"
    ></scripture-map-renderer>
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

import { GlyphMapSpecial } from "@/types/GlyphMapSpecial";

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";

//
@Options({
  name: "output-view",
  components: {
    ScriptureMapRenderer,
  },
  props: {
    triad: TriadMap,
    showInput: Boolean,
  },
})
export default class OutputView extends Vue {
  public mapDirection: TriadMappingDirection = TriadMappingDirection.BAC;
  public triad!: TriadMap;
  public showInput = false;
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
  private s = "";
  //
  constructor(...args: any[]) {
    super(args);
    this.scripture;
  }
  //
  get think() {
    return this.s;
  }
  set think(value: string) {
    if (this.scripture) {
      console.log(this.GOD.IN.O);
      this.scripture.read(value);
      this.s = value.toLocaleUpperCase();
    }
  }
}
</script>
