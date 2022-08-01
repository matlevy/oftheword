<template>
  <div class="scripture">
    <div class="scripture-letter">
      <LetterRenderer
        :letter="scriptureLetter"
        :colours="true"
      ></LetterRenderer>
    </div>
    <div class="scripture-words">
      <raw-scripture-renderer
        :class="{ rtl: rtl }"
        :verse="scripture"
        :i="scripture.IN.ref?.verse"
        @wordPick="onScriptureWordClick"
      ></raw-scripture-renderer>
    </div>
    <div class="scripture-first-and-last-letters" @click="onFirstLastClick">
      <LetterRenderer :letter="firstLetter" :colours="true"></LetterRenderer>
      <LetterRenderer :letter="lastLetter" :colours="true"></LetterRenderer>
    </div>
    <div
      class="alphabet-grid"
      v-if="textFocus.length > 0"
      :class="{ ['rtl']: rtl }"
    >
      <AlphaBetMap
        :rowFilter="gridFiltersBasic"
        :inputH="textFocus"
        :showLetterCrossReference="true"
      ></AlphaBetMap>
    </div>
    <!-- <scripture-map-renderer
      :word-border="true"
      class="scripture-map"
      :scripture="scripture"
      :map-direction="mapDirection"
      :input="search"
    ></scripture-map-renderer> -->
    <!-- <VerseAsGrid
      class="grid"
      :class="{ rtl: rtl }"
      :allowVertical="!rtl"
      :scripture="scripture"
    ></VerseAsGrid> -->
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Root } from "@/root";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { Letter } from "@/types/Letter";

import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import VerseAsGrid from "../components/scripture/VerseAsGrid.vue";
import LetterRenderer from "@/components/letter/LetterRenderer.vue";
import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import { Word } from "@/types/Word";

//
@Options({
  components: {
    RawScriptureRenderer,
    ScriptureMapRenderer,
    VerseAsGrid,
    LetterRenderer,
    AlphaBetMap,
  },
  props: {
    scripture: Scripture,
  },
})
export default class ScriptureView extends Vue {
  public mapDirection: TripletMappingDirection = TripletMappingDirection.BAC;
  public search = "";
  public scripture!: Scripture;
  public textFocus = "";
  //
  public get gridFiltersBasic(): string {
    return Root.getInstance().IN.O.G.getAllAsString().slice(0, 5);
  }
  //
  public get verse(): number {
    return Number(this.$route.params.verse);
  }
  //
  public get chapter(): number {
    return Number(this.$route.params.chapter);
  }
  //
  public get bookAsString(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Root.getInstance().getBookName(this.scripture?.IN.ref!.book - 1);
  }
  //
  public get maxVerses(): number {
    return (
      Root.getInstance().EXPLORER?.getVerseCount(
        this.bookAsString,
        this.scripture.IN.ref?.chapter || 1
      ) || 1
    );
  }
  //
  public get scriptureLetter(): Letter {
    return Root.getInstance().IN.O.G.getFromIndex(
      this.verse % Root.getInstance().IN.O.G.getAllAsString().length > 0
        ? this.verse % Root.getInstance().IN.O.G.getAllAsString().length
        : 1
    );
  }
  //
  public get maxChapters(): number {
    return Root.getInstance().EXPLORER?.getChapterCount(this.bookAsString) || 1;
  }
  //
  public get endOfLastChapter(): number {
    return (
      Root.getInstance().EXPLORER?.getVerseCount(
        this.bookAsString,
        Math.max((this.scripture.IN.ref?.chapter || 0) - 1, 1)
      ) || 1
    );
  }
  //
  public get connectingLetters(): string {
    return this.firstLetter.IN.E.concat(this.lastLetter.IN.E);
  }
  //
  public get firstLetter(): Letter {
    return this.scripture.A[0];
  }
  //
  public get lastLetter(): Letter {
    return this.scripture.A[this.scripture.A.length - 1];
  }
  //
  public get nextChapter(): number {
    return this.chapter < this.maxChapters ? this.chapter + 1 : 1;
  }
  //
  public get nextVerse(): number {
    return this.verse < this.maxVerses ? this.verse + 1 : 1;
  }
  //
  public get previousChapter(): number {
    return this.chapter > 1 ? this.chapter - 1 : this.chapter;
  }
  //
  public mounted() {
    window.addEventListener("keypress", (e) => this.onKeyUp(e));
  }
  //
  public get scriptureMatrix(): string[] {
    return this.scripture.E.split(/([a-z]{22,22})/gi).filter((v) => v != "");
  }
  //
  public onKeyUp(e: KeyboardEvent) {
    if (this.$route.name == "scripture") {
      switch (e.code) {
        case "BracketRight":
          this.gotoScripture(
            this.nextVerse == 1 ? this.chapter + 1 : this.chapter,
            this.nextVerse
          );
          break;
        case "BracketLeft":
          this.gotoScripture(
            this.verse > 1 ? this.chapter : this.previousChapter,
            this.verse > 1 ? this.verse - 1 : this.endOfLastChapter
          );
          break;
        default:
          if (/[0-9]/gi.test(e.key)) {
            const index = Number(e.key) == 0 ? 10 : Number(e.key) - 1;
            if (this.scriptureMatrix[index]) {
              this.$router.push({
                name: "alphabetgrid-by-stream",
                params: {
                  book: this.scripture.IN.ref?.book,
                  chapter: this.scripture.IN.ref?.chapter,
                  verse: this.scripture.IN.ref?.verse,
                  stream: this.scriptureMatrix[index],
                },
              });
            }
          }
          if (/[a-zA-Z]/gi.test(e.key)) {
            let code =
              Root.getInstance()
                .IN.O.G.getAllAsString()
                .indexOf(e.key.toLocaleUpperCase()) + 1;
            if (e.shiftKey) code = code + 26;
            // navigate to verse by letter
            if (code <= this.maxVerses) {
              this.gotoScripture(this.chapter, code);
            }
          }
      }
    }
  }
  //
  public get rtl() {
    return Root.getInstance().IN.O.G.rtl;
  }
  //
  public gotoScripture(chapter: number, verse: number) {
    this.$router.push({
      name: "scripture",
      params: {
        chapter: chapter,
        verse: verse,
      },
    });
  }
  //
  public onScriptureWordClick(word: Word, metaKey: boolean) {
    if (metaKey) {
      this.textFocus = this.textFocus.concat(word.R);
    } else {
      this.textFocus = word.R;
    }
  }
  //
  public onFirstLastClick() {
    this.textFocus = this.connectingLetters;
  }
}
</script>
<style scoped>
.scripture {
  color: white;
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
  text-align: left;
}

.scripture-letter {
  margin: 0.2rem;
  margin-bottom: 1rem;
}

.alphabet-grid {
  margin-top: 2rem;
  display: flex;
}
.alphabet-grid.rtl {
  flex-flow: column;
  align-items: flex-end;
  margin-right: -0.8rem;
}

.scripture-first-and-last-letters {
  cursor: pointer;
}
</style>
