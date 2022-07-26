<template>
  <div class="genesis-opening">
    <div><h3>Mathematical, and Numerical Phenomenom</h3></div>
    <div class="notes">
      <p>
        As a final observation, in relation to tallys of index values of given
        letters: removing repition of words, and noting the tally of index
        values, further mathematical phenomenam can be observed.
      </p>
      <p>
        In positions [O], and [H], we have the two numerical values required to
        calculate Theta, commonly known as the golden ration; and the
        corresponding vertical column of [G], and [E], when subtracted, provide
        the multiple: seven by twentytwo;
      </p>
    </div>
    <div class="grids">
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_SHORT.slice(0, 19)"
        :rowFilter="'C'"
        :showTally="true"
        :noColumnLabel="true"
        :allowNumberFocus="true"
        :showTallyLetters="true"
        @rowTallyChange="onTopTallyChange"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_SHORT.slice(19, 44)"
        :rowFilter="'C'"
        :showColumnLetterAtBottom="true"
        :tallyOffset="tallyOffset"
        :colCountOffset="22"
        :showTally="true"
        :noColumnLabel="true"
        :showTallyLetters="true"
        :allowNumberFocus="true"
      ></AlphaBetMap>
    </div>
    <div class="notes">
      <p>
        Numbers disaplayed bellow each row provide a tally of the index position
        of a letter, of the selected cross-references row: and can be changed by
        selecting the alphabet position: at the bottom of each table;
      </p>
      <p>
        Letters displayed above each tally circle the alphabet of twenty-six
        letters, in order, and display the letter the tally finishes upon:
        calculated by the modulus of the tally;
      </p>
      <p>
        By choosing a combination of letters, of the bottom row of each table,
        to adjust the tally, there can be seen a phenomenom of strings of
        letters appearing in order;
      </p>
      <p>
        [ED] will produce letters for [BEGAT], and [FNS]; and [AD] will produce
        [JMOIN]; [KA] will prodcuce [FILPSH] within [INJKLMN] of the first row,
        yet match to letters of [INNING] to create the word [FINISH], and
        [WDRLD] within the second row; [CO] will mirror [EATE] to [FTAE] in the
        second row: implicit of that eaten taken from [E] of existence, into
        [F], of form;
      </p>
    </div>
    <div class="grids">
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_ONE.slice(0, 22)"
        :rowFilter="'C'"
        :noColumnLabel="true"
        :showIndexValues="true"
        @rowTallyChange="onTopTallyChange"
      ></AlphaBetMap>
      <AlphaBetMap
        class="grid"
        :showOnlyColor="false"
        :inputH="GENESIS_ONE_ONE.slice(22, 44)"
        :rowFilter="'C'"
        :showColumnLetterAtBottom="true"
        :colCountOffset="22"
        :noColumnLabel="true"
        :showIndexValues="true"
        :showTallyLetters="false"
      ></AlphaBetMap>
      <div>
        <p>
          When considering the index values of each letters, in more than one
          instance digits of [7] under [22], or [7] under [1] will be seen
          several times in sequence;
        </p>
      </div>
    </div>
    <EncapsulationDecoratorVue></EncapsulationDecoratorVue>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";

import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
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
  public tallyOffset = 184;
  //
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public GENESIS_ONE_ONE: string = Root.getInstance()
    .BIBLE.getVerse(Root.getInstance().books.GENESIS, 1, 1)
    .match(/[A-Za-z]/gi)!
    .join("")
    .toLocaleUpperCase();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public GENESIS_ONE_TWO: string = Root.getInstance()
    .BIBLE.getVerse(Root.getInstance().books.GENESIS, 1, 2)
    .match(/[A-Za-z]/gi)!
    .join("")
    .toLocaleUpperCase();
  //
  public GENESIS_SHORT = "INTHEBEGINNINGGODCREATEDHEAVENANDEARTH";
  //
  constructor(...args: unknown[]) {
    super(args);
  }
  //
  public onTopTallyChange(newValue: number) {
    this.tallyOffset = newValue;
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
