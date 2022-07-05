<template>
  <span class="word" v-if="word !== null">
    <span class="stack" v-for="(output, index) in word.A" v-bind:key="index">
      <span class="glyph" v-if="output.MAP(mapDirection)[0]">
        <glyph-renderer :glyph="output.MAP(mapDirection)[0].a"></glyph-renderer>
        <glyph-renderer :glyph="output.MAP(mapDirection)[0].b"></glyph-renderer>
        <glyph-renderer :glyph="output.MAP(mapDirection)[0].c"></glyph-renderer>
      </span>
    </span>
  </span>
</template>
<script lang="ts">
import { TriadMappingDirection } from "@/types/TriadMappingDirection";
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";

@Options({
  name: "word-map-renderer",
  props: {
    word: Word,
    mapDirection: TriadMappingDirection,
  },
  components: {
    GlyphRenderer,
  },
})
export default class WordMapRenderer extends Vue {
  public word!: Word;
  public mapDirection: TriadMappingDirection = TriadMappingDirection.BAC;
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
    align-items: center;
    justify-content: center;
    .glyph {
      display: flex;
      flex-flow: column;
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
