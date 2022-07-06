<template>
  <div class="word-finder">
    <input v-model="searchTerm" width="100" />
    <button @click="search">Search</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { SPIRIT } from "@/types/wordActions/Spirit";

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
    console.clear();
    const term: SPIRIT = Root.getInstance().O.IN.GO!.FACE({
      S: this.searchTerm,
      P: -1,
      T: {},
    });
    console.log(term);
  }
}
</script>
