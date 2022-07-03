<template>
  <div class="chapter">
    <h1>Chapter {{ chapter.SEED.chapter }}:</h1>
    <raw-scripture-view
      v-for="(verse, index) in chapter.verse"
      v-bind:key="index"
      :verse="verse"
      class="verse"
    ></raw-scripture-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import RawScriptureView from "./RawScriptureView.vue";
import { Chapter } from "@/types/Chapter";

@Options({
  name: "raw-chapter-view",
  components: {
    RawScriptureView,
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
