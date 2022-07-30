<template>
  <div class="word" :class="{ ['rtl']: rtl }">
    <LetterRenderer
      v-for="(letter, index) in word.C"
      v-bind:key="index"
      :grammar="word.X[index]"
      :colours="colours"
      :showAsShape="showAsShape"
      :letter="letter"
    ></LetterRenderer>
    <LetterRenderer :letter="space"></LetterRenderer>
  </div>
</template>
<script lang="ts">
import { Root } from "@/root";
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import { Letter } from "@/types/Letter";

import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  name: "word-renderer",
  props: {
    word: Word,
    colours: Boolean,
    showAsShape: Boolean,
  },
  components: {
    LetterRenderer,
  },
})
export default class WordRenderer extends Vue {
  public word!: Word;
  public colours!: boolean;
  public showAsShape!: boolean;
  //
  public get rtl(): boolean {
    return Root.getInstance().IN.O.G.rtl;
  }
  //
  public get space(): Letter {
    return this.word.IN.GOD.IN.X.getLetter(" ");
  }
}
</script>

<style scoped lang="scss">
.word {
  display: flex;
  flex-wrap: wrap;
  .char {
    // flex-basis: calc(100% / 22);
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
  }
}
.rtl {
  flex-flow: row-reverse;
  flex-wrap: wrap;
  float: right !important;
  right: 0;
}
</style>
