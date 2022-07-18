<template>
  <div class="layout">
    <div class="words" v-if="scripture">
      <span
        class="word"
        :class="{ ['word-border']: wordBorder }"
        v-for="(word, wordIndex) in scripture.I"
        v-bind:key="wordIndex"
      >
        <triplet-renderer
          v-for="(output, wordLetterIndex) in word.A"
          v-bind:key="wordLetterIndex"
          @pick="onGlyphPick"
          @unpick="onLetterUnPick"
          :letter="output"
          :number="
            scripture.O.indexOf(
              output.MAP(mapDirection)[0].a.IN.E.charCodeAt(0) -
                scripture.IN.GOD.IN.G.start
            ) + 1
          "
          :match="input"
          :selectedGlyphs="selectedGlyphs"
          :scripture="scripture"
          :map-direction="mapDirection"
        >
        </triplet-renderer>
      </span>
    </div>
    <!-- <div class="words">
      <span class="word">
        <span
          class="stack"
          v-for="(letter, wordLetterIndex) in selectedGlyphs"
          v-bind:key="wordLetterIndex"
        >
          <span class="letter">
            <letter-renderer
              :selected="true"
              @pick="onLetterUnPick"
              @unpick="onLetterUnPick"
              :letter="letter"
            ></letter-renderer>
          </span>
        </span>
      </span>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Letter } from "@/types/Letter";
import { Scripture, ScriptureReference } from "@/types/Scripture";
import { Triplet } from "@/types/Triplet";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { Options, Vue } from "vue-class-component";

import TripletRenderer from "../letter/TripletRenderer.vue";
import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  name: "scripture-map-renderer",
  props: {
    scripture: Scripture,
    wordBorder: Boolean,
    mapDirection: TripletMappingDirection,
    input: String,
  },
  components: {
    TripletRenderer,
    LetterRenderer,
  },
})
export default class ScriptureMapRenderer extends Vue {
  public mapDirection!: TripletMappingDirection;
  public scripture!: Scripture;
  public wordBorder!: boolean;
  public selectedGlyphs: Array<Letter> = [];
  public input!: string;
  //
  private tally = 0;
  //
  public getTally(): number {
    this.tally += 1;
    return this.tally;
  }

  public onGlyphPick(letter: Letter) {
    if (this.selectedGlyphs.length < 3) {
      this.selectedGlyphs.push(letter);
    }
    if (this.selectedGlyphs.length >= 3) {
      const search: Triplet = this.scripture.IN.GOD.O.O.get({
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

  public onLetterUnPick(letter: Letter) {
    if (this.selectedGlyphs.indexOf(letter) != -1) {
      this.selectedGlyphs.splice(this.selectedGlyphs.indexOf(letter), 1);
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
    .letter {
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
