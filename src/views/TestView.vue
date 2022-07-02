<template>
  <div class="scripture">
    <raw-scripture-view
      :scripture="scripture"
      @word-select="selectWord"
    ></raw-scripture-view>
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

import WordMapView from "@/views/WordMapView.vue";
import ScriptureMapView from "@/views/ScriptureMapView.vue";
import ScriptureWordColumnView from "@/views/ScriptureWordColumnView.vue";
import RawScriptureView from "@/views/RawScriptureView.vue";
import OutputView from "./OutputView.vue";
import { Root } from "@/root";

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
  public scripture!: Scripture;
  public selectedWord!: Word;
  //
  constructor(...args: any[]) {
    super(args);
    this.scripture = Root.getInstance().gen.chapters[0].scriptures[0];
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
