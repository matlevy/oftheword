<template>
  <div class="scripture">
    <a
      href="#index"
      v-for="(word, index) in scripture.I"
      v-bind:key="index"
      :title="(index + 1).toString()"
      class="glyph"
      @click="selectWord(word)"
    >
      {{ word.WR?.R }}&nbsp;
    </a>
    <div class="words">
      <word-map-view
        v-if="selectWord != null"
        :word="selectedWord"
      ></word-map-view>
    </div>
    <scripture-map-view
      v-if="scripture"
      :scripture="scripture"
    ></scripture-map-view>
    <scripture-word-column-view
      v-if="scripture"
      :scripture="scripture"
    ></scripture-word-column-view>
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
//
@Options({
  components: {
    WordMapView,
    ScriptureMapView,
    ScriptureWordColumnView,
  },
})
export default class TestView extends Vue {
  public scripture: Scripture;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  private s = "";

  public selectedWord: Word;

  constructor(...args: any[]) {
    super(args);
    this.scripture = new Scripture({
      GOD: new God({
        OD: this.wordMap,
        O: new TriadMap(GlyphMapLatin.getInstance()),
        G: GlyphMapLatin.getInstance(),
      }),
      ref: {
        book: 1,
        chapter: 1,
        verse: 1,
      },
    });
    this.think =
      "IN THE BEGINNING GOD CREATED THE HEAVEN AND THE EARTH AND THE EARTH WAS WITHOUT FORM; AND VOID; AND DARKNESS WAS UPON THE FACE OF THE EARTH; AND THE SPIRIT OF GOD MOVED UPON THE FACE OF THE WATERS ";
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
