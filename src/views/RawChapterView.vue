<template>
  <div class="chapter">
    <h1>Chapter {{ chapter.SEED.chapter }}</h1>
    <raw-scripture-renderer
      v-for="(verse, index) in chapter?.verse"
      v-bind:key="index"
      :verse="verse"
      :i="index + 1"
      class="verse"
    ></raw-scripture-renderer>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Chapter } from "@/types/Chapter";
import { Root } from "@/root";

import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";

@Options({
  name: "raw-chapter-view",
  components: {
    RawScriptureRenderer,
  },
  props: {
    chapter: Chapter,
  },
})
export default class RawChapterView extends Vue {
  public chapter!: Chapter;
  //
  public get chapterNumber(): number {
    return Number(this.$route.params.chapter) - 1;
  }
  //
  public get bookAsString(): string {
    const bookNum = Number(this.$route.params.book) - 1;
    return Root.getInstance().getBookName(bookNum);
  }
  //
  public mounted() {
    window.addEventListener("keypress", (e) => this.onKeyUp(e));
  }
  //
  public get maxChapters(): number {
    return Root.getInstance().BIBLE.getChapterCount(this.bookAsString);
  }
  //
  public get nextChapter(): number {
    return this.chapterNumber < this.maxChapters ? this.chapterNumber + 1 : 1;
  }
  //
  public gotoScripture(chapter: number, verse: number) {
    this.$router.push({
      name: "scripture",
      params: {
        chapter: chapter,
        verse: verse,
      },
    });
  }
  //
  public onKeyUp(e: KeyboardEvent) {
    if (this.$route.name == "scripture") {
      switch (e.code) {
        case "BracketRight":
          this.gotoScripture(this.chapterNumber + 1, 1);
          break;
        case "BracketLeft":
          this.gotoScripture(this.chapterNumber - 1, 1);
          break;
      }
    }
  }
}
</script>
<style>
.chapter {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 2rem;
  max-width: 1000px;
}
.verse {
  width: 100%;
  display: flex;
}
h1 {
  text-align: left;
  font-size: 2rem;
  color: white;
}
</style>
