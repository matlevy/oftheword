<template>
  <div class="words" v-if="scripture">
    <span class="word" v-for="(word, index) in scripture.I" v-bind:key="index">
      <span class="stack" v-for="n in 30" v-bind:key="n">
        <glyph-renderer
          :glyph="output"
          class="glyph"
          v-for="(output, index) in word.A"
          v-bind:key="index"
          v-show="canRender(n, index, word.A.length)"
        ></glyph-renderer>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Scripture } from "@/types/Scripture";
import { Options, Vue } from "vue-class-component";

import GlyphRenderer from "@/components/glyph/GlyphRenderer.vue";

@Options({
  name: "scripture-word-column-renderer",
  props: {
    scripture: Scripture,
  },
  components: {
    GlyphRenderer,
  },
})
export default class ScriptureWordColumnRenderer extends Vue {
  public scripture!: Scripture;
  public canRender(n: number, i: number, len: number): boolean {
    return n * len - i < 30;
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
  flex-flow: column;
  .stack {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    width: 25px;
    flex-flow: column;
    padding: 0 auto;
    align-items: center;
    justify-content: center;
    .glyph {
      display: flex;
      flex-flow: row;
      text-align: center;
      padding: auto auto;
    }
  }
}
</style>
