<template>
  <div class="word">
    <div
      class="stack"
      v-for="(output, index) in word.output"
      v-bind:key="index"
    >
      <glyph-view :glyph="output?.firstIn.a"></glyph-view>
      <glyph-view :glyph="output?.firstIn.b"></glyph-view>
      <glyph-view :glyph="output?.firstIn.c"></glyph-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import GlyphView from "./GlyphView.vue";

@Options({
  name: "word-map-view",
  props: {
    word: Word,
  },
  components: {
    GlyphView,
  },
})
export default class WordMapView extends Vue {
  public word!: Word;
}
</script>

<style scoped lang="scss">
.word {
  display: flex;
  flex-wrap: wrap;
  .stack {
    flex-basis: calc(100% / 22);
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    flex-flow: column;
    .glyph {
    }
  }
}
</style>
