<template>
  <div class="two-letter-map">
    <div class="notes">
      Asking the question: given two letters, and the surrounding two letters of
      such, and the known first instance of such; what are the parenting two
      letters surrounding, and the flow of such as a map?
    </div>
    <div v-for="(bgm, index) in word.BG" v-bind:key="index">
      <BiGlyphMapRow
        @select="onPairSelected(word, $event)"
        :word="word"
        :letterMap="bgm"
      ></BiGlyphMapRow>
    </div>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Vue, Options } from "vue-class-component";
import { TwoLetterContainer } from "@/types/TwoLetters";

import LetterRenderer from "@/components/letter/LetterRenderer.vue";
import BiGlyphMapRow from "@/components/search/BiGlyphMapRow.vue";

@Options({
  name: "two-letter-map",
  props: {
    word: Word,
  },
  components: {
    LetterRenderer,
    BiGlyphMapRow,
  },
})
export default class TwoLetterMap extends Vue {
  public word!: Word;
  public onPairSelected(WR: Word, BG: TwoLetterContainer) {
    this.$emit("select", { WR, BG });
  }
}
</script>
<style lang="scss" scoped>
.two-letter-map {
  display: flex;
  flex-direction: column;
}
.arrow {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.notes {
  color: white;
  margin-top: 1rem;
  margin-bottom: 2rem;
  max-width: 1000px;
}
</style>
