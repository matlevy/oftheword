<template>
  <div class="genesis-opening">
    <div><h1>Genesis: The Opening, and Root Map</h1></div>
    <div class="grids">
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_ONE.slice(0, 22)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_ONE.slice(22, 44)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
        :colCountOffset="22"
      ></AlphaBetMap>
    </div>
    <div class="grids">
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_TWO.slice(0, 22)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_TWO.slice(22, 44)"
        :rowFilter="FILTER_ABC"
        :cuts="[3, 10]"
        :showColumnLetterAtBottom="true"
        :colCountOffset="22"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_TWO.slice(44, 66)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
        :colCountOffset="12"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_TWO.slice(66, 88)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
        :colCountOffset="34"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_TWO.slice(88, 154)"
        :rowFilter="FILTER_ABC"
        :showColumnLetterAtBottom="true"
        :colCountOffset="4"
      ></AlphaBetMap>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";

import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import BibleBooksEnglish from "@/types/bibles/BibleBooksEnglish";

@Options({
  name: "genesis-opening",
  components: {
    AlphaBetMap,
  },
})
export default class GenesisOpeningVue extends Vue {
  //
  public FILTER_ABC = "ABC";
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
  max-width: 1000px;
}
.grid {
  margin-bottom: 2rem;
}
</style>
