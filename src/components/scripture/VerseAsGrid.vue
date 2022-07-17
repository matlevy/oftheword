<template>
  <div class="">
    <div class="scripture-grid">
      <glyph-renderer
        class="glyph"
        :class="{
          ['highlightPrimary']: highlightPrimary(glyph, index),
          ['highlightSecondary']: highlightSecondary(glyph, index),
        }"
        v-for="(glyph, index) in output"
        v-bind:key="index"
        :colours="false"
        :glyph="glyph"
      ></glyph-renderer>
    </div>
    <bi-glyph-map-row class="river" :glyphMap="biGlyphStart"></bi-glyph-map-row>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Glyph } from "@/types/Glyph";
import { Root } from "@/root";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { BiglyphContainer } from "@/types/BiGlyph";

import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";
import BiGlyphMapRow from "@/components/search/BiGlyphMapRow.vue";

@Options({
  components: {
    GlyphRenderer,
    BiGlyphMapRow,
  },
  props: {
    chapter: Number,
    verse: Number,
    spirit: Object,
  },
})
export default class VerseAsGrid extends Vue {
  public chapter!: number;
  public verse!: number;
  public spirit!: SPIRIT;
  //
  public get verseText(): string {
    if (this.chapter && this.verse) {
      const text = Root.getInstance().BIBLE.getVerse(
        BibleBooksEnglish.ENGLISH.GENESIS,
        this.chapter,
        this.verse
      );
      const matches = text.toLocaleUpperCase().match(/[A-Z]/gi);
      return matches ? matches.join("") : "";
    }
    return "";
  }
  //
  public get output(): Glyph[] {
    return [...this.verseText].map((v: string) => {
      return Root.getInstance().O.G.getGlyph(v);
    });
  }
  //
  public get biGlyphStart(): BiglyphContainer {
    return {
      BG: {
        a: this.getGlyph(this.spirit.S.charAt(0)),
        b: this.getGlyph(this.spirit.S.charAt(this.spirit.S.length - 1)),
      },
      IN: {
        a: this.getGlyph(
          this.verseText.charAt(this.verseText.indexOf(this.spirit.S) - 1)
        ),
        b: this.getGlyph(
          this.verseText.charAt(
            this.verseText.indexOf(this.spirit.S) + this.spirit.S.length
          )
        ),
      },
    };
  }
  //
  private getGlyph(char: string): Glyph {
    return Root.getInstance().O.G.getGlyph(char);
  }
  //
  public highlightPrimary(glyph: Glyph, index: number): boolean {
    const start = this.verseText.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && index >= start && index < end;
  }
  //
  public highlightSecondary(glyph: Glyph, index: number): boolean {
    const start = this.verseText.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && (index == start - 1 || index == end);
  }
}
</script>
<style lang="scss" scoped>
.scripture-grid {
  margin-top: 2rem;
  display: flex;
  max-width: 1000px;
  min-width: 1000px;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #444444;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 5px;
  .glyph {
    width: 45px;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    align-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: white;
    box-sizing: border-box;
  }
  .highlightPrimary {
    color: red;
  }
  .highlightSecondary {
    color: yellow;
    border-inline: 1px solid yellow;
    box-sizing: border-box;
  }
}
.river {
  margin-top: 1rem;
}
</style>
