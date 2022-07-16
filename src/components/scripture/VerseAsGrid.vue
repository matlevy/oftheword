<template>
  <div class="scripture-grid">
    <glyph-renderer
      class="glyph"
      v-for="(glyph, index) in output"
      v-bind:key="index"
      :colours="false"
      :glyph="glyph"
    ></glyph-renderer>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Glyph } from "@/types/Glyph";
import { Root } from "@/root";

import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";

@Options({
  components: {
    GlyphRenderer,
  },
  props: {
    chapter: Number,
    verse: Number,
  },
})
export default class VerseAsGrid extends Vue {
  public chapter!: number;
  public verse!: number;

  public get output(): Glyph[] {
    console.log(this.chapter);
    const AB: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      this.chapter,
      this.verse
    );
    return [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...AB.toLocaleUpperCase().match(/[A-Z]/gi)!.join("")!,
    ].map((v: string) => {
      return Root.getInstance().O.G.getGlyph(v);
    });
  }
}
</script>
<style lang="scss" scoped>
.scripture-grid {
  margin-top: 2rem;
  display: flex;
  max-width: 1000px;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #444444;
  .glyph {
    width: calc(1000px / 22);
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    align-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
