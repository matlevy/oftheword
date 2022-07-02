<template>
  <div class="raw">
    {{ scripture.IN.ref?.verse }}.&nbsp;
    <a
      href="#index"
      v-for="(word, index) in scripture.I"
      v-bind:key="index"
      :title="(index + 1).toString()"
      class="glyph"
      @click="onWordClick(word)"
    >
      {{ word.WR?.R
      }}{{ scripture.X[index] ? scripture.X[index].character : "" }}&nbsp;
    </a>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Word } from "@/types/Word";

@Options({
  name: "raw-scripture-view",
  props: {
    scripture: Scripture,
  },
})
export default class RawScriptureView extends Vue {
  public scripture!: Scripture;
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
}
</style>
