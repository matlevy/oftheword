<template>
  <div class="chapter">
    <h1>Chapter {{ chapter.SEED.chapter }}:</h1>
    <raw-scripture-renderer
      v-for="(verse, index) in chapter.verse"
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
}
</script>
<style>
.chapter {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 2rem;
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
