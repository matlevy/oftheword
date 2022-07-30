<template>
  <div class="words" v-if="scripture">
    <span class="word" v-for="(word, c) in scripture.I" v-bind:key="c">
      <span class="stack" v-for="n in 30" v-bind:key="n">
        <letter-renderer
          :letter="letter"
          class="letter"
          :class="{
            'last-selected': isaSelected(
              n * word.E.length + i - word.E.length,
              c
            ),
            permissable: isPermissable(letter),
          }"
          v-for="(letter, i) in word.C"
          :data-n="n * word.E.length + i - word.E.length"
          :data-c="c"
          :colours="false"
          v-bind:key="i"
          v-show="canRender(n, i, word.C.length)"
          @click="
            onLetterClick(letter, n * word.E.length + i - word.E.length, c, i)
          "
        ></letter-renderer>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Scripture } from "@/types/Scripture";
import { Options, Vue } from "vue-class-component";
import { Letter } from "@/types/Letter";
import { Word } from "@/types/Word";

import LetterRenderer from "@/components/letter/LetterRenderer.vue";

@Options({
  name: "scripture-word-column-renderer",
  props: {
    scripture: Scripture,
  },
  components: {
    LetterRenderer,
  },
})
export default class ScriptureWordColumnRenderer extends Vue {
  public scripture!: Scripture;
  public selectedChain: Array<Letter> = [];
  public aSelected: Array<number> = [-1, -1, -1];
  public bSelected: Array<number> = [-1, -1, -1];
  public cSelected: Array<number> = [-1, -1, -1];
  //
  public canRender(n: number, i: number, len: number): boolean {
    return n * len - i < 30;
  }
  //
  public onLetterClick(
    letter: Letter,
    row: number,
    column: number,
    index: number
  ) {
    this.cSelected = this.bSelected;
    this.bSelected = this.aSelected;
    this.aSelected = [row, column, index];
  }
  //
  public isaSelected(row: number, col: number) {
    return this.aSelected[0] == row && this.aSelected[1] == col;
  }
  //
  public get aSelectedWord(): Word | undefined {
    return this.scripture.I[this.aSelected[1]];
  }
  //
  public get permissableLetters(): Letter[] {
    const word: Word = this.scripture.I[this.aSelected[1]];
    if (!word) return [];
    const letterA: Letter = word.C[this.aSelected[2]];
    if (!this.scripture.I) return [];
    return this.scripture.I.concat(...this.scripture.I)
      .concat(...this.scripture.I)
      .flatMap((w: Word) => {
        if (!w.C) return [];
        return w.C.flatMap((v: Letter, i: number, a: Letter[]) => {
          return v == letterA ? [a[i - 2], a[i - 1], a[i + 1], a[i + 2]] : [];
        }).reduce((p: Letter[], c: Letter) => {
          if (p.indexOf(c) == -1 && c != undefined) p.push(c);
          return p;
        }, []);
      })
      .reduce((p: Letter[], c: Letter) => {
        if (p.indexOf(c) == -1 && c != undefined) p.push(c);
        return p;
      }, []);
  }
  //
  public isPermissable(letter: Letter): boolean {
    return this.permissableLetters.indexOf(letter) != -1;
  }
}
</script>

<style scoped lang="scss">
.words {
  display: flex;
  border: 1px solid #444444;
  padding: 1rem;
  max-width: 800px;
  width: fit-content;
  overflow: scroll;
}
.word {
  display: flex;
  flex-flow: column;
  .stack {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    width: 2.2rem;
    flex-flow: column;
    padding: 0 auto;
    align-items: center;
    justify-content: center;
    .letter {
      display: flex;
      flex-flow: row;
      text-align: center;
      justify-content: center;
      font-size: 1rem;
      cursor: pointer;
      font-weight: lighter;
      &.last-selected {
        color: red;
      }

      &.permissable {
        color: yellow;
      }
    }
  }
}
</style>
