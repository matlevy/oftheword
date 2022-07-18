<template>
  <span class="words" v-if="word !== null">
    <div class="notes">
      <p>
        Genesis 1:2 begins to describe how thoughts take shape; and the
        connectivity of the letters <b>[ WITHOUT FORM ]</b> connect thought
        prococess to <b>[ THE EARTH ]</b>, and <b>[ VOID ]</b>: the birth of an
        idea, to determine the following mapping of letters: based on first
        occurance;
      </p>
      <p>
        The following grids show mapping of letters within a word: acting as a
        "pin", demonstrating a word acts as a point of connectivity of concious
        thought;
      </p>
    </div>
    <div class="output">
      <span class="word">
        <h4>R O</h4>
        <div class="stack">
          <triplet-renderer
            v-for="(output, wordLetterIndex) in word.A"
            v-bind:key="wordLetterIndex"
            @pick="onGlyphPick"
            @unpick="onGlyphUnPick"
            :letter="output"
            :match="input"
            :filter="filter"
            :selectedLetters="selectedLetters"
            :scripture="scripture"
            :map-direction="RO"
          >
          </triplet-renderer>
        </div>
      </span>
      <span class="word">
        <h4>T O</h4>
        <div class="stack">
          <triplet-renderer
            v-for="(output, wordLetterIndex) in word.A"
            v-bind:key="wordLetterIndex"
            @pick="onGlyphPick"
            @unpick="onGlyphUnPick"
            :letter="output"
            :match="input"
            :filter="filter"
            :selectedLetters="selectedLetters"
            :scripture="scripture"
            :map-direction="TO"
          >
          </triplet-renderer>
        </div>
      </span>
      <span class="word">
        <h4>U T</h4>
        <div class="stack">
          <triplet-renderer
            v-for="(output, wordLetterIndex) in word.A"
            v-bind:key="wordLetterIndex"
            @pick="onGlyphPick"
            @unpick="onGlyphUnPick"
            :letter="output"
            :match="input"
            :filter="filter"
            :selectedLetters="selectedLetters"
            :scripture="scripture"
            :map-direction="UT"
          >
          </triplet-renderer>
        </div>
      </span>
    </div>
  </span>
</template>
<script lang="ts">
import { Letter } from "@/types/Letter";
import { Scripture, ScriptureReference } from "@/types/Scripture";
import { Triplet } from "@/types/Triplet";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";

import TripletRenderer from "../letter/TripletRenderer.vue";
import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  name: "word-map-renderer",
  props: {
    word: Word,
    scripture: Scripture,
    input: String,
    filter: String,
    selectedLetters: Array,
  },
  components: {
    TripletRenderer,
    LetterRenderer,
  },
})
export default class WordMapRenderer extends Vue {
  public word!: Word;
  public selectedLetters: Array<Letter> = [];
  public scripture!: Scripture;
  public input!: string;
  public filter!: string;

  public TO: TripletMappingDirection = TripletMappingDirection.BAC;
  public UT: TripletMappingDirection = TripletMappingDirection.CAB;
  public RO: TripletMappingDirection = TripletMappingDirection.ACB;

  public onGlyphPick(letter: Letter) {
    if (this.selectedLetters.length < 3) {
      this.selectedLetters.push(letter);
    }
    if (this.selectedLetters.length >= 3) {
      const search: Triplet = this.scripture.IN.GOD.O.O.get({
        a: this.selectedLetters[0],
        b: this.selectedLetters[1],
        c: this.selectedLetters[2],
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

  public onGlyphUnPick(letter: Letter) {
    if (this.selectedLetters.indexOf(letter) != -1) {
      this.selectedLetters.splice(this.selectedLetters.indexOf(letter), 1);
    }
  }
}
</script>

<style scoped lang="scss">
.words {
  display: flex;
  flex-flow: column;
}

.notes {
  color: white;
  margin-bottom: 1rem;
  margin-left: 0.3rem;
}

.output {
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
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 1rem;
    margin-top: 1rem;
    .letter {
      display: flex;
      flex-flow: column;
      text-align: center;
    }
  }
}
</style>
