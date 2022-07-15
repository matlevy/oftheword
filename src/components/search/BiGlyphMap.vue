<template>
  <div class="biglyph-map">
    <div v-for="(bgm, index) in word.BG" v-bind:key="index">
      <BiGlyphMapRow :glyphMap="bgm"></BiGlyphMapRow>
    </div>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Vue, Options } from "vue-class-component";

import GlyphRenderer from "@/components/glyph/GlyphRenderer.vue";
import BiGlyphMapRow from "@/components/search/BiGlyphMapRow.vue";

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
</style>
