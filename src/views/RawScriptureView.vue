<template>
  <div class="raw">
    <div class="verse-label">{{ verse.IN.ref?.verse }}.</div>
    <div class="verse-text">
      <a
        href="#index"
        v-for="(word, index) in verse.I"
        v-bind:key="index"
        :title="(index + 1).toString()"
        class="glyph"
        @click="onWordClick(word)"
      >
        {{ word.WR?.R
        }}{{ verse.X[index] ? verse.X[index].character : "" }}&nbsp;
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Word } from "@/types/Word";

@Options({
  name: "raw-scripture-view",
  props: {
    verse: Scripture,
  },
})
export default class RawScriptureView extends Vue {
  public verse!: Scripture;
  public onWordClick(word: Word) {
    this.$emit("word-select", word);
  }
}
</script>
<style>
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
}
.verse-text,
.verse-label {
  float: left;
}
.verse-label {
  min-width: 40px;
}
</style>
