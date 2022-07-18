<template>
  <div class="raw">
    <router-link
      class="verse-label"
      :to="{
        name: 'scripture',
        params: {
          book: verse.IN.chapter?.SEED.book,
          chapter: verse.IN.chapter?.SEED.chapter,
          verse: i,
        },
      }"
      ><div>{{ verse.IN.ref?.verse }}.</div></router-link
    >
    <div class="verse-text" ref="scripture">
      <span
        v-for="(word, index) in verse.I"
        v-bind:key="index"
        :title="(index + 1).toString()"
        @click="selectWord(word)"
        class="glyph"
        >{{ word.WR?.R
        }}{{ verse.X[index] ? verse.X[index].character : "" }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Word } from "@/types/Word";

@Options({
  name: "raw-scripture-renderer",
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
  private debounce(fn: () => void, delay: number) {
    let timer: any = null;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this);
      }, delay);
    };
  }
  //
  public mounted() {
    document.addEventListener(
      "selectionchange",
      this.debounce(() => {
        const selection = document
          .getSelection()
          ?.toString()
          .normalize("NFD")
          .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, "")
          ?.replace(/\n/gi, " ");
        if (selection !== "") {
          this.$emit("highlight", selection + " ");
        }
      }, 100)
    );
  }
  //
  public selectWord(word: Word) {
    this.$emit("selectWord", word);
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
}
.glyph {
  margin-right: 7px;
  padding: 0;
}
.verse-text {
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
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
}
.verse-label {
  min-width: 40px;
}
</style>
