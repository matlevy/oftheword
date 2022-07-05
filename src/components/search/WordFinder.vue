<template>
  <div class="word-finder">
    <input v-model="searchTerm" width="100" />
    <button @click="search">Search</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { ReferencePoint } from "@/types/SourceMap";

@Options({
  name: "word-finder",
})
export default class WordFinder extends Vue {
  public searchTerm = "cerebelum";
  //
  constructor(...args: any[]) {
    super(args);
  }
  public search() {
    const output: ReferencePoint = Root.getInstance().O.IN.GO!.search(
      this.searchTerm
    );
    console.log(output);
  }
}
</script>
