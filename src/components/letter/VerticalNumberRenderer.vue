<template>
  <div class="vertical-number-renderer">
    <LetterRenderer
      v-if="asLetters"
      class="as-letter"
      :letter="numberAsLetter"
      :colours="true"
    ></LetterRenderer>
    <NumberRenderer
      v-for="(digit, index) in numberMatrix"
      v-bind:key="index"
      class="number"
      :number="digit"
    ></NumberRenderer>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { Letter } from "@/types/Letter";

import NumberRenderer from "./NumberRenderer.vue";
import LetterRenderer from "./LetterRenderer.vue";

@Options({
  name: "vertical-number-renderer",
  components: {
    NumberRenderer,
    LetterRenderer,
  },
  props: {
    number: Number,
    asLetters: Boolean,
  },
})
export default class VerticalNumberRenderer extends Vue {
  public number!: number;
  public asLetters!: boolean;
  //
  private lettersCount: number =
    Root.getInstance().IN.O.G.getAllAsString().length;
  //
  public get numberMatrix(): string[] {
    if (!this.number) return [];
    return [...this.number.toString()];
  }

  public get numberAsLetter(): Letter {
    const index =
      this.number % this.lettersCount == 0
        ? 1
        : this.number % this.lettersCount;
    return Root.getInstance().IN.O.G.getFromIndex(index);
  }
}
</script>
<style lang="scss" scoped>
.vertical-number-renderer {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.number {
  font-size: 1rem;
  margin: 0;
}
.as-letter {
  margin: 0;
}
</style>
