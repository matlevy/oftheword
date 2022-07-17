<template>
  <div class="layout">
    <div>
      <h3 class="title" v-if="scripture.IN.ref?.chapter">
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
        <triad-renderer
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
          @pick="onGlyphPick"
          @unpick="onGlyphUnPick"
          :glyph="output"
          :number="
            scripture.O.indexOf(
              output.MAP(mapDirection)[0].a.character.charCodeAt(0) -
                scripture.IN.GOD.IN.G.start
            ) + 1
          "
          :match="input"
          :selectedGlyphs="selectedGlyphs"
          :scripture="scripture"
          :map-direction="mapDirection"
        >
        </triad-renderer>
      </span>
    </div>
    <!-- <div class="words">
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
    </div> -->
  </div>
</template>
<script lang="ts">
import { Glyph } from "@/types/Glyph";
import { Scripture, ScriptureReference } from "@/types/Scripture";
import { Triad } from "@/types/Triad";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";
import { Options, Vue } from "vue-class-component";

import TriadRenderer from "../glyph/TriadRenderer.vue";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";

@Options({
  name: "scripture-map-renderer",
  props: {
    scripture: Scripture,
    wordBorder: Boolean,
    mapDirection: TriadMappingDirection,
    input: String,
  },
  components: {
    TriadRenderer,
    GlyphRenderer,
  },
})
export default class ScriptureMapRenderer extends Vue {
  public mapDirection!: TriadMappingDirection;
  public scripture!: Scripture;
  public wordBorder!: boolean;
  public selectedGlyphs: Array<Glyph> = [];
  public input!: string;
  //
  private tally = 0;
  //
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
  padding-left: 0rem;
}
.words {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
}
.word {
  display: flex;
  padding-right: 0.3rem;
  margin-left: 0.3rem;
  margin-top: 1rem;
  &.word-border {
    border-right: 1px dotted rgba(255, 255, 255, 0.2);
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

.layout {
  display: flex;
  flex-direction: column;
}

h4 {
  text-align: left;
  font-size: 1rem;
  color: white;
  margin: 0;
  padding-left: 5px;
  float: left;
}
</style>
