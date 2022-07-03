<template>
  <div class="alphabet-map-view">
    <h1>The Alphabet</h1>
    <p>The following is a map of the alphabet divided by the words "In The".</p>
    <p>
      The Bible of King James, and all other Bibles, divide the alphabet into
      five sections, allowing one to create a map of each letter of a word and
      understand the spiritual representation of each letter.
    </p>
    <alphabet-map></alphabet-map>
    <p>
      Each of these letters have been mapped, asking which two letters the
      letter of the alphabet sits within.
    </p>
    <p>
      The second row is to the left of the alphabet letter, and the third row
      the letter to the right.
    </p>
    <p>
      We can see here that there appears to be a sense of direction within each
      row; appearing to suggest the first row being "from where", and the second
      "where to": pointing to the relevant letter in the alphabet;
    </p>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import AlphabetMap from "@/components/glyph/AlphabetMap.vue";

@Options({
  name: "glyph-view",
  components: {
    AlphabetMap,
  },
})
export default class AlphabetView extends Vue {
  constructor(...args: any[]) {
    super(args);
  }
}
</script>
<style>
.alphabet-map-view {
  text-align: left;
  color: white;
  margin: 1rem;
  max-width: 800px;
}
</style>
