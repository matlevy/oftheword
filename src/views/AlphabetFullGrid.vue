<template>
  <div class="alphabet-map-view">
    <h1>Full Alphabet Grid</h1>
    <div class="notes">
      <p>
        As discussed previously, it is possible to divide the Alphabet into
        principal, abstract sections of concious experience: by vowel;
      </p>
      <p>
        Applying the divisions, the first occurance of a given letter is
        observed, and the preceeding two letters mapped to rows one [A] and two
        [B]: succeeding of the first occurance are placed vertically, providing
        each column with a number of letters representative to the count of
        those within the alphabet;
      </p>
      <p>
        This provides the following grid: again mapped vertically by the
        divisions of the alphabet: providing a form of cross-reference;
      </p>
      <p>
        The "natural word", to which we write, is contructed of letters in row
        [C];
      </p>
    </div>
    <AlphaBetMap></AlphaBetMap>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AlphaBetMap from "@/components/letter/AlphabetMap.vue";

@Options({
  name: "alphabet-full-grid",
  components: {
    AlphaBetMap,
  },
})
export default class AlphabetFullGrid extends Vue {}
</script>
<style lang="scss" scoped>
.alphabet-map-view {
  text-align: left;
  color: white;
  margin: 1rem;
  max-width: 1000px;
  margin-bottom: 2rem !important;
}
.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
