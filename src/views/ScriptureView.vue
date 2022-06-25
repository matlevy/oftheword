<template>
  <div class="scripture">
    <input type="text" key="" v-model="think" size="88" />
    <div>{{ _scripture.E }}</div>
    <span
      href="#index"
      v-for="(word, index) in _scripture.I"
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
//
@Options({
  components: {},
})
export default class ScriptureView extends Vue {
  public _scripture: Scripture;
  public _wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  private _s = "";

  constructor(...args: any[]) {
    super(args);
    this._scripture = new Scripture({
      GOD: new God({
        O: {
          D: this._wordMap,
        },
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
    this._scripture.read(value);
    this._s = value.toLocaleUpperCase();
  }
  get think() {
    return this._s;
  }
}
</script>
<style>
.scripture {
  color: white;
}
</style>
