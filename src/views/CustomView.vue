<template>
  <div class="custom-view">
    <output-view
      ref="output"
      :triad="triads"
      :scripture="scripture"
      :inputWidth="70"
      :showInput="true"
    ></output-view>
    <bi-glyph-map
      v-if="word.E.length > 3"
      class="biglyph-map"
      :word="word"
    ></bi-glyph-map>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { GlyphMapLatin } from "@/types/GlyphMapLatin";
import { GlyphMapSpecial } from "@/types/GlyphMapSpecial";
import { God } from "@/types/wordActions/God";
import { TriadMap } from "@/types/TriadMap";
import { WordMap } from "@/types/WordMap";
import { Word } from "@/types/Word";
import { Root } from "@/root";

import OutputView from "@/components/search/OutputView.vue";
import BiGlyphMap from "@/components/search/BiGlyphMap.vue";

@Options({
  name: "custom-view",
  components: {
    OutputView,
    BiGlyphMap,
  },
})
export default class CustomView extends Vue {
  public text = "";
  //
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  //
  private GOD: God = new God({
    OD: this.wordMap,
    O: Root.getInstance().triadMap,
    G: GlyphMapLatin.getInstance(),
    X: GlyphMapSpecial.getInstance(),
  });
  public scripture: Scripture = new Scripture({
    GOD: this.GOD,
    map: false,
  });
  //
  public mounted() {
    if (this.$route.query.input) {
      this.text = (this.$route.query.input as string).toLocaleUpperCase();
      (this.$refs.output as OutputView).think = this.text.concat(" ");
    }
  }
  //
  public get word() {
    if (this.scripture && this.scripture.I.length > 0) {
      return this.scripture.I[0];
    }
    return new Word({
      GOD: this.GOD,
      scripture: this.scripture,
      start: -1,
      end: -1,
      map: false,
    });
  }
  //
  public get triads(): TriadMap {
    return Root.getInstance().triadMap;
  }
}
</script>
<style lang="scss" scoped>
.custom-view {
  margin: 1rem;
  margin-left: 2rem;
  text-align: left;
  color: white;
}
</style>
