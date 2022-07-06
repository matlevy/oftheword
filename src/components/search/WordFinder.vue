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
  public searchTerm = "there";
  //
  constructor(...args: any[]) {
    super(args);
  }
  public search() {
    const term: SPIRIT = {
      S: this.searchTerm,
      P: -1,
      T: {},
    };
    Root.getInstance().O.IN.GO!.moveUponTheFace(term);
    console.log(term);
  }
}
</script>
