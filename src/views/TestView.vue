<template>
  <div class="scripture">
    <raw-scripture-renderer
      :scripture="scripture"
      @word-select="selectWord"
    ></raw-scripture-renderer>
    <!-- <div class="words">
      <word-map-view
        v-if="selectWord != null"
        :word="selectedWord"
      ></word-map-view>
    </div> -->
    <!-- <output-view :triad="triadMap"></output-view> -->
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
import { Word } from "@/types/Word";

import WordMapRenderer from "@/components/word/WordMapRenderer.vue";
import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import ScriptureWordColumnRenderer from "@/components/scripture/ScriptureWordColumnRenderer.vue";
import OutputView from "@/components/search/OutputView.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import { Root } from "@/root";

//
@Options({
  components: {
    WordMapRenderer,
    ScriptureMapRenderer,
    ScriptureWordColumnRenderer,
    OutputView,
    RawScriptureRenderer,
  },
})
export default class TestView extends Vue {
  public scripture!: Scripture;
  public selectedWord!: Word;
  //
  constructor(...args: any[]) {
    super(args);
    this.scripture = Root.getInstance().gen.chapters[0].verse[0];
    console.log(this.scripture);
  }
  //
  public selectWord(word: Word) {
    //this.selectedWord = word;
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
