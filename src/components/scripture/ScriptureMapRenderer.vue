<template>
  <div>
    <div>
      <h3 class="title">
        Chapter: {{ scripture.IN.ref?.chapter }}:{{ scripture.IN.ref?.verse }}
      </h3>
    </div>
    <div class="words" v-if="scripture">
      <span
        class="word"
        :class="{ ['word-border']: wordBorder }"
        v-for="(word, wordIndex) in scripture.I"
        v-bind:key="wordIndex"
      >
        <span
          class="stack"
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
        >
          <span class="glyph" v-if="output.IN[0]">
            <glyph-renderer
              @pick="onGlyphPick"
              @unpick="onGlyphUnPick"
              :glyph="output.IN[0].a"
            ></glyph-renderer>
            <glyph-renderer
              @pick="onGlyphPick"
              @unpick="onGlyphUnPick"
              :glyph="output.IN[0].b"
            ></glyph-renderer>
            <glyph-renderer
              @pick="onGlyphPick"
              @unpick="onGlyphUnPick"
              :glyph="output.IN[0].c"
            ></glyph-renderer>
            <number-renderer
              :number="
                scripture.O.indexOf(
                  output.IN[0].a.character.charCodeAt(0) - 64
                ) + 1
              "
            ></number-renderer>
          </span>
        </span>
      </span>
    </div>
    <div class="words">
      <span class="word">
        <span
          class="stack"
          v-for="(glyph, wordLetterIndex) in selectedGlyphs"
          v-bind:key="wordLetterIndex"
        >
          <span class="glyph">
            <glyph-renderer
              :selected="true"
              @pick="onGlyphUnPick"
              @unpick="onGlyphUnPick"
              :glyph="glyph"
            ></glyph-renderer>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Glyph } from "@/types/Glyph";
import { Scripture, ScriptureReference } from "@/types/Scripture";
import { Triad } from "@/types/Triad";
import { Options, Vue } from "vue-class-component";

import GlyphRenderer from "../glyph/GlyphRenderer.vue";
import NumberRenderer from "../glyph/NumberRenderer.vue";

@Options({
  name: "scripture-map-renderer",
  props: {
    scripture: Scripture,
    wordBorder: Boolean,
  },
  components: {
    GlyphRenderer,
    NumberRenderer,
  },
})
export default class ScriptureMapRenderer extends Vue {
  public scripture!: Scripture;
  public wordBorder!: boolean;
  public selectedGlyphs: Array<Glyph> = [];
  //
  private tally = 0;

  public getTally(): number {
    this.tally += 1;
    return this.tally;
  }

  public onGlyphPick(glyph: Glyph) {
    if (this.selectedGlyphs.length < 3) {
      this.selectedGlyphs.push(glyph);
    }
    if (this.selectedGlyphs.length >= 3) {
      const search: Triad = this.scripture.IN.GOD.O.O.get({
        a: this.selectedGlyphs[0],
        b: this.selectedGlyphs[1],
        c: this.selectedGlyphs[2],
        i: {
          index: 0,
          ref: this.scripture.IN.ref as ScriptureReference,
        },
        remap: false,
        GOD: this.scripture.IN.GOD,
        scripture: this.scripture,
      });
      if (search) {
        this.$emit("cross-ref", search);
      }
    }
  }

  public onGlyphUnPick(glyph: Glyph) {
    if (this.selectedGlyphs.indexOf(glyph) != -1) {
      this.selectedGlyphs.splice(this.selectedGlyphs.indexOf(glyph), 1);
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  padding-left: 0.6rem;
}
.words {
  display: flex;
  flex-wrap: wrap;
}
.word {
  display: flex;
  padding-right: 0.3rem;
  &.word-border {
    border-right: 1px dashed rgba(255, 255, 255, 0.5);
  }
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
