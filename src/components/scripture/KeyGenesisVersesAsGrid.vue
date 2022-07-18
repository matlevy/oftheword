<template>
  <div>
    <div class="scripture-grid">
      <letter-renderer
        class="letter"
        v-for="(letter, index) in combinedText"
        v-bind:key="index"
        :colours="false"
        :letter="letter"
      ></letter-renderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Letter } from "@/types/Letter";
import { Root } from "@/root";

import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";
import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  components: {
    LetterRenderer,
  },
  props: {},
})
export default class KeyGenesisVersesAsGrid extends Vue {
  public get combinedText(): Letter[] {
    const AA: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      1,
      1
    );
    const AB: string = Root.getInstance().BIBLE.getVerse(
      BibleBooksEnglish.ENGLISH.GENESIS,
      1,
      2
    );
    return [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...AA.concat(AB).toLocaleUpperCase().match(/[A-Z]/gi)!.join("")!,
    ].map((v: string) => {
      return Root.getInstance().IN.O.G.getLetter(v);
    });
  }
}
</script>
<style lang="scss" scoped>
.scripture-grid {
  margin-top: 2rem;
  display: flex;
  max-width: 1000px;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #444444;
  .letter {
    width: calc(1000px / 22);
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    align-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
