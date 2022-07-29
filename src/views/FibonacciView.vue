<template>
  <div class="fibonacci-grid">
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
  name: "fibonacci-grid",
  components: {
    AlphaBetMap,
    VerseAsGrid,
  },
  props: {},
})
export default class FibonacciViewVue extends Vue {
  //
  mounted() {
    window.addEventListener("keypress", (e) => this.onKeyUp(e));
  }
  //
  public get fibonacci(): string[] {
    const seed: number[] = new Array<number>(154).fill(0);
    seed[0] = 1;
    seed[1] = 1;
    return seed
      .reduce((p: number[], c: number, index: number) => {
        if (index >= 2) {
          p[index] = p[index - 2] + p[index - 1];
        } else {
          p[index] = c;
        }
        return p;
      }, [])
      .map((v: number) => {
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
    if (this.$route.name == "fibonacci") {
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
.fibonacci-grid {
  display: flex;
}
</style>
