<template>
  <span class="word">
    <span class="stack" v-for="(output, index) in word.A" v-bind:key="index">
      <span class="glyph" v-if="output.IN[0]">
        <glyph-view :glyph="output.IN[0].a"></glyph-view>
        <glyph-view :glyph="output.IN[0].b"></glyph-view>
        <glyph-view :glyph="output.IN[0].c"></glyph-view>
      </span>
    </span>
  </span>
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
  .stack {
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    width: 40px;
    .glyph {
      display: flex;
      flex-flow: column;
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
