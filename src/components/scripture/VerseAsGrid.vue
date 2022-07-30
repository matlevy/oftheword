<template>
  <div class="scripture-grid-view" ref="container">
    <div
      class="scripture-grid"
      :class="{ ['reverse']: reverse }"
      v-if="!vertical"
      @click="expandToFullScreen"
    >
      <letter-renderer
        class="letter"
        :class="{
          ['highlightPrimary']: highlightPrimary(letter, index),
          ['highlightSecondary']: highlightSecondary(letter, index),
        }"
        v-for="(letter, index) in output"
        v-bind:key="index"
        :colours="false"
        :letter="letter"
      ></letter-renderer>
    </div>
    <ScriptureWordColumnRenderer
      @click="expandToFullScreen"
      v-if="vertical"
      :scripture="scripture"
      class="scripture-vertical"
    >
    </ScriptureWordColumnRenderer>
    <button
      v-if="allowVerical"
      class="display-type-button"
      @click="switchViewType"
    >
      View {{ vertical ? "Horizontal" : "Vertical" }}
    </button>
    <!-- <bi-letter-map-row
      class="river"
      :letterMap="biGlyphStart"
    ></bi-letter-map-row> -->
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Letter } from "@/types/Letter";
import { Root } from "@/root";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { TwoLetterContainer } from "@/types/TwoLetters";
import { Scripture } from "@/types/Scripture";

import LetterRenderer from "../letter/LetterRenderer.vue";
import BiGlyphMapRow from "@/components/search/BiGlyphMapRow.vue";
import ScriptureWordColumnRenderer from "./ScriptureWordColumnRenderer.vue";

@Options({
  components: {
    LetterRenderer,
    BiGlyphMapRow,
    ScriptureWordColumnRenderer,
  },
  props: {
    chapter: Number,
    verse: Number,
    spirit: Object,
    scripture: Scripture,
    allowVertical: Boolean,
    reverse: Boolean,
  },
})
export default class VerseAsGrid extends Vue {
  public chapter!: number;
  public verse!: number;
  public spirit!: SPIRIT;
  public scripture!: Scripture;
  public vertical = false;
  public allowVerical!: boolean;
  public reverse: boolean = Root.getInstance().IN.O.G.rtl;
  //
  public get verseText(): string {
    if (this.scripture) return this.scripture.E;
    if (this.chapter && this.verse) {
      const text = Root.getInstance().BIBLE.getVerse(
        Root.getInstance().books.GENESIS,
        this.chapter,
        this.verse
      );
      const matches = text.toLocaleUpperCase().match(/[0-9]/gi);
      return matches ? matches.join("") : "";
    }
    return "";
  }
  //
  public get output(): Letter[] {
    return [...this.verseText].map((v: string) => {
      return Root.getInstance().IN.O.G.getLetter(v);
    });
  }
  //
  public get biGlyphStart(): TwoLetterContainer {
    return {
      BG: {
        a: this.getLetter(this.spirit.S.charAt(0)),
        b: this.getLetter(this.spirit.S.charAt(this.spirit.S.length - 1)),
      },
      IN: {
        a: this.getLetter(
          this.verseText.charAt(this.verseText.indexOf(this.spirit.S) - 1)
        ),
        b: this.getLetter(
          this.verseText.charAt(
            this.verseText.indexOf(this.spirit.S) + this.spirit.S.length
          )
        ),
      },
    };
  }
  //
  private getLetter(char: string): Letter {
    return Root.getInstance().IN.O.G.getLetter(char);
  }
  //
  public highlightPrimary(letter: Letter, index: number): boolean {
    if (!this.spirit) return false;
    const start = this.verseText.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && index >= start && index < end;
  }
  //
  public highlightSecondary(letter: Letter, index: number): boolean {
    if (!this.spirit) return false;
    const start = this.verseText.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && (index == start - 1 || index == end);
  }
  //
  public expandToFullScreen() {
    if (this.$el.requestFullscreen) {
      this.$el.requestFullscreen();
    } else if (this.$el.webkitRequestFullscreen) {
      this.$el.webkitRequestFullscreen();
    } else if (this.$el.msRequestFullscreen) {
      this.$el.msRequestFullscreen();
    }
  }
  //
  public switchViewType() {
    this.vertical = !this.vertical;
  }
}
</script>
<style lang="scss" scoped>
.display-type-button {
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #444444;
  color: white;
  margin-top: 0.5rem;
}

.scripture-vertical {
  margin-top: 2rem;
}
.scripture-grid-view {
  margin-left: 2rem;
  //
  &:fullscreen {
    margin-left: 0;
    min-width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    background-color: rgb(25, 25, 25);
    .scripture-grid {
      margin-top: auto;
      margin-bottom: auto;
    }
  }
}
.scripture-grid {
  margin-top: 2rem;
  display: flex;
  max-width: 800px;
  min-width: 800px;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #444444;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 5px;
  &:fullscreen {
    margin-top: auto;
    margin-bottom: auto;
  }
  &.reverse {
    flex-direction: row-reverse;
  }
  .letter {
    width: 36px;
    padding: 0;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    align-content: center;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
