<template>
  <div>
    <div class="scripture-grid">
      <glyph-renderer
        class="glyph"
        v-for="(glyph, index) in combinedText"
        v-bind:key="index"
        :colours="false"
        :glyph="glyph"
      ></glyph-renderer>
    </div>
    <div class="scripture-grid">
      <glyph-renderer
        class="glyph"
        v-for="(glyph, index) in subText"
        v-bind:key="index"
        :colours="false"
        :glyph="glyph"
      ></glyph-renderer>
    </div>
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
  props: {},
})
export default class KeyGenesisVersesAsGrid extends Vue {
  public get combinedText(): Glyph[] {
    const AA: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      1,
      1
    );
    const AB: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      1,
      2
    );
    return [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...AA.concat(AB).toLocaleUpperCase().match(/[A-Z]/gi)!.join("")!,
    ].map((v: string) => {
      return Root.getInstance().O.G.getGlyph(v);
    });
  }
  public get subText(): Glyph[] {
    const AB: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      1,
      3
    );
    return [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...AB.concat(AB).toLocaleUpperCase().match(/[A-Z]/gi)!.join("")!,
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
  border: 1px solid white;
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
