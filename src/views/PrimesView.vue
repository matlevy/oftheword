<template>
  <div class="primes-grid">
    <VerseAsGrid class="grid" :scripture="scripture"></VerseAsGrid>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import AlphaBetMap from "@/components/letter/AlphabetMap.vue";
import VerseAsGrid from "../components/scripture/VerseAsGrid.vue";

import { Root } from "@/root";
import { Scripture } from "@/types/Scripture";

@Options({
  name: "primes-grid",
  components: {
    AlphaBetMap,
    VerseAsGrid,
  },
  props: {},
})
export default class PrimesView extends Vue {
  //
  mounted() {
    window.addEventListener("keypress", (e) => this.onKeyUp(e));
  }
  //
  public get fibonacci(): string[] {
    const seed: number[] = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149,
      151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
      233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313,
      317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
      419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
      503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601,
      607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
      701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809,
      811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
    ];
    return seed.map((v: number) => {
      return Root.getInstance().IN.O.G.getFromIndex(v % 26 !== 0 ? v % 26 : 1)
        .IN.E;
    });
  }
  //
  public get scripture(): Scripture {
    return new Scripture({
      GOD: Root.getInstance().IN.O,
      map: false,
    }).read(this.fibonacci.join(" ").concat(" "));
  }
  //
  public get scriptureMatrix(): string[] {
    return this.scripture.E.split(/([a-z]{22,22})/gi).filter((v) => v != "");
  }
  //
  public onKeyUp(e: KeyboardEvent) {
    if (this.$route.name == "primes") {
      switch (e.code) {
        default:
          if (/[0-9]/gi.test(e.key)) {
            const index = Number(e.key) == 0 ? 10 : Number(e.key) - 1;
            if (this.scriptureMatrix[index]) {
              this.$router.push({
                name: "alphabetgrid-by-stream",
                params: {
                  book: 0,
                  chapter: 0,
                  verse: 0,
                  stream: this.scriptureMatrix[index],
                },
              });
            }
          }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.primes-grid {
  display: flex;
}
</style>
