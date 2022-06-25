<template>
  <div class="scripture">
    <input type="text" key="" v-model="think" size="88" />
    <div>{{ scripture.E }}</div>
    <span
      href="#index"
      v-for="(word, index) in scripture.I"
      v-bind:key="index"
      :title="(index + 1).toString()"
      class="glyph"
    >
      {{ word.WR?.R }}&nbsp;
    </span>
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
//
@Options({
  components: {},
})
export default class TestView extends Vue {
  public scripture: Scripture;
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  private s = "";

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
<style>
.scripture {
  color: white;
}
</style>
