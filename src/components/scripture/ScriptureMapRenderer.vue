<template>
  <div class="words" v-if="scripture">
    <span
      class="word"
      v-for="(word, wordIndex) in scripture.I"
      v-bind:key="wordIndex"
    >
      <span
        class="stack"
        v-for="(output, wordLetterIndex) in word.A"
        v-bind:key="wordLetterIndex"
      >
        <span class="glyph" v-if="output.IN[0]">
          <glyph-renderer :glyph="output.IN[0].a"></glyph-renderer>
          <glyph-renderer :glyph="output.IN[0].b"></glyph-renderer>
          <glyph-renderer :glyph="output.IN[0].c"></glyph-renderer>
          <number-renderer
            :number="
              scripture.O.indexOf(output.IN[0].a.character.charCodeAt(0) - 64) +
              1
            "
          ></number-renderer>
        </span>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Scripture } from "@/types/Scripture";
import { Options, Vue } from "vue-class-component";

import GlyphRenderer from "../glyph/GlyphRenderer.vue";
import NumberRenderer from "../glyph/NumberRenderer.vue";

@Options({
  name: "scripture-map-renderer",
  props: {
    scripture: Scripture,
  },
  components: {
    GlyphRenderer,
    NumberRenderer,
  },
})
export default class ScriptureMapRenderer extends Vue {
  public scripture!: Scripture;
  //
  private tally = 0;

  public getTally(): number {
    this.tally += 1;
    return this.tally;
  }
}
</script>

<style scoped lang="scss">
.words {
  display: flex;
  flex-wrap: wrap;
}
.word {
  display: flex;
  border-right: 1px dashed rgba(255, 255, 255, 0.3);
  .stack {
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    width: 25px;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    .glyph {
      display: flex;
      flex-flow: column;
      text-align: center;
    }
  }
}
</style>
