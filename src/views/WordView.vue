<template>
  <div class="word">
    <glyph-view
      :glyph="glyph"
      v-for="(glyph, index) in word.output"
      v-bind:key="index"
    ></glyph-view>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import GlyphView from "./GlyphView.vue";

@Options({
  name: "word-view",
  props: {
    word: Word,
  },
  components: {
    GlyphView,
  },
})
export default class WordView extends Vue {
  public word!: Word;
}
</script>

<style scoped lang="scss">
.word {
  display: flex;
  flex-wrap: wrap;
  .glyph {
    flex-basis: calc(100% / 22);
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
