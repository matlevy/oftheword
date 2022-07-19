<template>
  <div class="alphabet-map-view">
    <h1>The Alphabet</h1>
    <AlphaBetMap></AlphaBetMap>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AlphaBetMap from "@/components/letter/AlphabetMap.vue";

@Options({
  name: "letter-view",
  components: {
    AlphaBetMap,
  },
})
export default class AlphabetView extends Vue {}
</script>
<style>
.alphabet-map-view {
  text-align: left;
  color: white;
  margin: 1rem;
  max-width: 1000px;
}
</style>
