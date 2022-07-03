<template>
  <div class="book">
    <raw-chapter-view
      v-for="(chapter, index) in book.chapters"
      v-bind:key="index"
      :chapter="chapter"
    ></raw-chapter-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import RawChapterView from "./RawChapterView.vue";
import { Book } from "@/types/Book";
import { Root } from "@/root";

@Options({
  name: "raw-book-view",
  components: {
    RawChapterView,
  },
})
export default class RawBookView extends Vue {
  public get book(): Book {
    return Root.getInstance().gen;
  }
}
</script>
