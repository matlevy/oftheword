<template>
  <div class="raw">
    <div class="verse-text" :class="{ ['rtl']: rtl }" ref="scripture">
      <WordRenderer
        v-for="(word, index) in verse.I"
        :color="false"
        :word="word"
        v-bind:key="index"
      ></WordRenderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Word } from "@/types/Word";
import { Root } from "@/root";

import WordRenderer from "../word/WordRenderer.vue";
import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  name: "raw-scripture-renderer",
  components: {
    WordRenderer,
    LetterRenderer,
  },
  props: {
    verse: Scripture,
    i: Number,
  },
})
export default class RawScriptureRenderer extends Vue {
  public verse!: Scripture;
  public i!: number;
  public onWordClick(word: Word) {
    this.$router.push({
      name: "word",
      params: {
        word: word.E.toLocaleUpperCase(),
      },
    });
  }
  //
  public selectWord(word: Word) {
    this.$emit("selectWord", word);
  }
  //
  public get rtl() {
    return Root.getInstance().IN.O.G.rtl;
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.raw {
  text-align: left;
  font-weight: bold;
  color: white;
  display: block;
  margin-bottom: 0.8rem;
  display: flex;
  max-width: 840px;
}
.letter {
  margin-right: 7px;
  padding: 0;
  font-size: 1.2em;
}
.verse-text {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.rtl {
  flex-flow: row-reverse;
  flex-wrap: wrap;
  float: right !important;
  right: 0;
}

::selection {
  background-color: yellow;
  color: black;
}
a:hover {
  color: red;
}
.verse-text,
.verse-label {
  float: left;
  font-size: 1em;
}
.verse-label {
  min-width: 1rem;
}
</style>
