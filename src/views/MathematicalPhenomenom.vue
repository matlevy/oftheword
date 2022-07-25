<template>
  <div class="genesis-opening">
    <div><h1>Mathematical, and Numerical Phenomenom</h1></div>
    <div class="grids">
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_SHORT.slice(0, 19)"
        :rowFilter="'C'"
        :showTally="true"
        :noColumnLabel="true"
        :allowNumberFocus="true"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_SHORT.slice(19, 44)"
        :rowFilter="'C'"
        :showColumnLetterAtBottom="true"
        :tallyOffset="184"
        :colCountOffset="22"
        :showTally="true"
        :noColumnLabel="true"
        :allowNumberFocus="true"
      ></AlphaBetMap>
    </div>
    <EncapsulationDecoratorVue></EncapsulationDecoratorVue>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";

import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";
import EncapsulationDecoratorVue from "@/components/reading/EncapsulationDecorator.vue";

@Options({
  name: "genesis-opening",
  components: {
    AlphaBetMap,
    EncapsulationDecoratorVue,
  },
})
export default class MathematicalPhen extends Vue {
  //
  public FILTER_ABC = "ABCDEFG";
  //
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public GENESIS_ONE_ONE: string = Root.getInstance()
    .BIBLE.getVerse(BibleBooksEnglish.ENGLISH.GENESIS, 1, 1)
    .match(/[A-Za-z]/gi)!
    .join("")
    .toLocaleUpperCase();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public GENESIS_ONE_TWO: string = Root.getInstance()
    .BIBLE.getVerse(BibleBooksEnglish.ENGLISH.GENESIS, 1, 2)
    .match(/[A-Za-z]/gi)!
    .join("")
    .toLocaleUpperCase();
  //
  public GENESIS_SHORT = "INTHEBEGINNINGGODCREATEDHEAVENANDEARTH";
  //
  constructor(...args: unknown[]) {
    super(args);
  }
}
</script>
<style lang="scss" scoped>
.genesis-opening {
  display: flex;
  flex-flow: column;
  text-align: left;
  color: white;
  margin: 2rem;
  max-width: 800px;
}
.grid {
  margin-bottom: 2rem;
}
.notes {
  margin-bottom: 2rem;
}
</style>
