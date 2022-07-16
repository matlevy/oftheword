<template>
  <div class="biglyph-map">
    <div class="notes">
      Asking the question: given two letters, and the surrounding two letters of
      such, and the known first instance of such; what are the parenting two
      letters surrounding, and the flow of such as a map?
    </div>
    <div v-for="(bgm, index) in word.BG" v-bind:key="index">
      <BiGlyphMapRow
        @select="onPairSelected(word, $event)"
        :word="word"
        :glyphMap="bgm"
      ></BiGlyphMapRow>
    </div>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Vue, Options } from "vue-class-component";

import GlyphRenderer from "@/components/glyph/GlyphRenderer.vue";
import BiGlyphMapRow from "@/components/search/BiGlyphMapRow.vue";
import { BiglyphContainer } from "@/types/BiGlyph";

@Options({
  name: "biglyph-map",
  props: {
    word: Word,
  },
  components: {
    GlyphRenderer,
    BiGlyphMapRow,
  },
})
export default class BiGlyphMap extends Vue {
  public word!: Word;
  public onPairSelected(WR: Word, BG: BiglyphContainer) {
    this.$emit("select", { WR, BG });
  }
}
</script>
<style lang="scss" scoped>
.biglyph-map {
  display: flex;
  flex-direction: column;
}
.arrow {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 0.3rem;
  max-width: 1000px;
}
</style>
