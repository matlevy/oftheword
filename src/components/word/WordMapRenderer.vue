<template>
  <span class="words" v-if="word !== null">
    <span class="word">
      <h4>TO</h4>
      <div class="stack">
        <triad-renderer
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
          @pick="onGlyphPick"
          @unpick="onGlyphUnPick"
          :glyph="output"
          :number="
              scripture.O.indexOf(
                output.MAP(TO)[0].a!.character.charCodeAt(0) - 64
              ) + 1
            "
          :match="input"
          :filter="filter"
          :selectedGlyphs="selectedGlyphs"
          :scripture="scripture"
          :map-direction="TO"
        >
        </triad-renderer>
      </div>
    </span>
    <span class="word">
      <h4>FROM</h4>
      <div class="stack">
        <triad-renderer
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
          @pick="onGlyphPick"
          @unpick="onGlyphUnPick"
          :glyph="output"
          :number="
              scripture.O.indexOf(
                output.MAP(RO)[0].a!.character.charCodeAt(0) - 64
              ) + 1
            "
          :match="input"
          :filter="filter"
          :selectedGlyphs="selectedGlyphs"
          :scripture="scripture"
          :map-direction="RO"
        >
        </triad-renderer>
      </div>
    </span>
    <span class="word">
      <h4>PUT</h4>
      <div class="stack">
        <triad-renderer
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
          @pick="onGlyphPick"
          @unpick="onGlyphUnPick"
          :glyph="output"
          :number="
              scripture.O.indexOf(
                output.MAP(UT)[0].a!.character.charCodeAt(0) - 64
              ) + 1
            "
          :match="input"
          :filter="filter"
          :selectedGlyphs="selectedGlyphs"
          :scripture="scripture"
          :map-direction="UT"
        >
        </triad-renderer>
      </div>
    </span>
  </span>
</template>
<script lang="ts">
import { Glyph } from "@/types/Glyph";
import { Scripture, ScriptureReference } from "@/types/Scripture";
import { Triad } from "@/types/Triad";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";

import TriadRenderer from "../glyph/TriadRenderer.vue";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";

@Options({
  name: "word-map-renderer",
  props: {
    word: Word,
    scripture: Scripture,
    input: String,
    filter: String,
    selectedGlyphs: Array,
  },
  components: {
    TriadRenderer,
    GlyphRenderer,
  },
})
export default class WordMapRenderer extends Vue {
  public word!: Word;
  public selectedGlyphs: Array<Glyph> = [];
  public scripture!: Scripture;
  public input!: string;
  public filter!: string;

  public TO: TriadMappingDirection = TriadMappingDirection.BAC;
  public UT: TriadMappingDirection = TriadMappingDirection.CAB;
  public RO: TriadMappingDirection = TriadMappingDirection.ACB;

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
.words {
  display: flex;
  flex-flow: row;
}

h4 {
  text-align: left;
  font-size: 1rem;
  color: white;
  margin: 0;
  padding-left: 5px;
}
.word {
  display: flex;
  padding-right: 0.3rem;
  flex-flow: column;
  &.word-border {
    border-right: 1px dashed rgba(255, 255, 255, 0.5);
  }
  .stack {
    color: white;
    font-weight: bold;
    display: flex;
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
