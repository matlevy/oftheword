<template>
  <div class="scripture">
    <raw-scripture-view
      :scripture="scripture"
      @word-select="selectWord"
    ></raw-scripture-view>
    <div class="words">
      <word-map-view
        v-if="selectWord != null"
        :word="selectedWord"
      ></word-map-view>
    </div>
    <output-view :triad="triadMap"></output-view>
    <!--<scripture-map-view
      v-if="scripture"
      :scripture="scripture"
    ></scripture-map-view>
    <scripture-word-column-view
      v-if="scripture"
      :scripture="scripture"
    ></scripture-word-column-view>-->
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { WordMap } from "@/types/WordMap";
import { Word } from "@/types/Word";
import { God } from "@/types/wordActions/God";
import { GlyphMapLatin } from "@/types/GlyphMapLatin";
import { TriadMap } from "@/types/TriadMap";

import WordMapView from "@/views/WordMapView.vue";
import ScriptureMapView from "@/views/ScriptureMapView.vue";
import ScriptureWordColumnView from "@/views/ScriptureWordColumnView.vue";
import RawScriptureView from "@/views/RawScriptureView.vue";
import OutputView from "./OutputView.vue";
import { BibleChapter, BibleExplorer } from "@/types/bibles/BibleExplorer";
import Bibles from "@/types/bibles/Bibles";
import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";
import { Chapter } from "@/types/Chapter";
import { GlyphMapSpecial } from "@/types/GlyphMapSpecial";

//
@Options({
  components: {
    WordMapView,
    ScriptureMapView,
    ScriptureWordColumnView,
    OutputView,
    RawScriptureView,
  },
})
export default class TestView extends Vue {
  public scripture: Scripture;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  public triadMap: TriadMap;
  public O: God;
  //
  private s = "";
  //
  public selectedWord: Word;
  //
  constructor(...args: any[]) {
    super(args);
    this.triadMap = new TriadMap(GlyphMapLatin.getInstance());
    this.O = new God({
      OD: this.wordMap,
      O: this.triadMap,
      G: GlyphMapLatin.getInstance(),
      X: GlyphMapSpecial.getInstance(),
    });

    let GENESIS_1: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 1);

    let GENESIS_2: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 2);

    let GENESIS_3: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 3);

    let GENESIS_4: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 4);

    let GENESIS_5: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 5);

    let GENESIS_6: BibleChapter = new BibleExplorer(
      Bibles.KING_JAMES
    ).getChapter(BibleBooksEnglish.ENGLISH.GENESIS, 6);

    let GEN: Chapter = new Chapter({
      GOD: this.O,
    })
      .read({
        book: 1,
        chapter: GENESIS_1.chapter,
        scripture: GENESIS_1.scripture,
      })
      .read({
        book: 1,
        chapter: GENESIS_2.chapter,
        scripture: GENESIS_2.scripture,
      })
      .read({
        book: 1,
        chapter: GENESIS_3.chapter,
        scripture: GENESIS_3.scripture,
      })
      .read({
        book: 1,
        chapter: GENESIS_4.chapter,
        scripture: GENESIS_4.scripture,
      })
      .read({
        book: 1,
        chapter: GENESIS_5.chapter,
        scripture: GENESIS_5.scripture,
      })
      .read({
        book: 1,
        chapter: GENESIS_6.chapter,
        scripture: GENESIS_6.scripture,
      });

    this.scripture = GEN.scriptures[1];

    this.selectedWord = this.scripture.I[0];
  }
  //
  public selectWord(word: Word) {
    this.selectedWord = word;
  }
  //
  set think(value: string) {
    this.scripture.read(value);
    this.s = value.toLocaleUpperCase();
  }
  get think() {
    return this.s;
  }
}
</script>
<style scoped>
.scripture {
  color: white;
}
.words {
  display: flex;
  flex-wrap: wrap;
}
</style>
