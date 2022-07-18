<template>
  <div class="chapter">
    <h1>Chapter {{ theChapter.SEED.chapter }}</h1>
    <raw-scripture-renderer
      v-for="(verse, index) in theChapter.verse"
      v-bind:key="index"
      :verse="verse"
      :i="index + 1"
      @selectWord="atWordSelected"
      class="verse"
    ></raw-scripture-renderer>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Chapter } from "@/types/Chapter";
import { Root } from "@/root";
import { Word } from "@/types/Word";

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

  public get theChapter(): Chapter {
    if (this.chapter) return this.chapter;
    return Root.getInstance().gen.chapters[
      Number(this.$route.params.chapter) - 1
    ];
  }

  public atWordSelected(word: Word) {
    this.$router.replace({
      name: "word",
      params: { search: word.E },
    });
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
