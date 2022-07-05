<template>
  <div>
    <word-finder></word-finder>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import WordFinder from "@/components/search/WordFinder.vue";

@Options({
  name: "existance-search",
  components: {
    WordFinder,
  },
})
export default class ExistenceSearch extends Vue {
  //
  constructor(...args: any[]) {
    super(args);
  }
}
</script>
