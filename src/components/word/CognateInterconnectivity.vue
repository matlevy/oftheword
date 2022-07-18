<template>
  <div class="cognate-interconnectivity">
    <div v-for="(branch, b) in streams" v-bind:key="b">
      <letter-renderer
        class="letter"
        :class="{
          ['highlightPrimary']: highlightPrimary(b, i),
          ['highlightSecondary']: highlightSecondary(b, i),
        }"
        v-for="(letter, i) in branch"
        v-bind:key="i"
        :colours="true"
        :letter="letter"
      ></letter-renderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Root } from "@/root";
import { Letter } from "@/types/Letter";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { Vue, Options } from "vue-class-component";

import LetterRenderer from "../letter/LetterRenderer.vue";

@Options({
  components: {
    LetterRenderer,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateInterconnectivity extends Vue {
  public spirit!: SPIRIT;
  public get streams(): Array<Letter[]> {
    const letters: Array<Letter[]> = this.streamsAsArray(this.spirit, [])
      .reduce((p: Array<string>, spirit: SPIRIT) => {
        if (spirit.I && spirit.SCRIPTURE && spirit.SCRIPTURE.E) {
          const S: string = spirit.SCRIPTURE.E.concat(spirit.SCRIPTURE.E);
          const P = S.indexOf(spirit.S);
          const L = P + spirit.S.length;
          const A = (this.spirit.S || "").indexOf(spirit.S);
          const C = (this.spirit.S || "").length - (A + spirit.S.length);
          const E = S.slice(P - A - 1, L + C + 1);
          if (p.indexOf(E) == -1) p.push(E);
        }
        return p;
      }, [])
      .map((v: string) => {
        return [...v].map((v: string) => {
          return Root.getInstance().IN.O.G.getLetter(v);
        });
      });
    return letters;
  }
  //
  public streamsAsArray(spirit: SPIRIT, array: Array<SPIRIT>): Array<SPIRIT> {
    if (spirit.I && spirit.I.length > 0 && spirit.S.length >= 2) {
      spirit.I.forEach((v: string) => {
        const S: SPIRIT = spirit.T[v];
        if (S.S.length >= 1) {
          array.push(S);
          this.streamsAsArray(S, array);
        }
      });
    }
    return array;
  }
  //
  public highlightPrimary(B: number, G: number): boolean {
    const T = this.streams[B].map((v: Letter) => v.IN.E).join("");
    const S = this.streamsAsArray(this.spirit, [])[B].S;
    const P = T.indexOf(S);
    const E = T.indexOf(S) + S.length;
    return P > -1 && G >= P && G < E;
  }
  //
  public highlightSecondary(B: number, G: number): boolean {
    const T = this.streams[B].map((v: Letter) => v.IN.E).join("");
    const S = this.streamsAsArray(this.spirit, [])[B].S;
    const P = T.indexOf(S);
    const E = T.indexOf(S) + S.length;
    return P > -1 && (G == P - 1 || G == E);
  }
}
</script>
<style lang="scss" scoped>
.cognate-interconnectivity {
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: inline-block;
  padding: 0.5rem;
}

.cognate-element {
  color: black;
}

.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 0.3rem;
  max-width: 1000px;
}
.letter {
  display: inline-block;
  font-weight: bold;
  opacity: 0.3;
  width: 1.5rem;
}
.highlightPrimary {
  opacity: 1;
}
.highlightSecondary {
  opacity: 1;
  box-sizing: border-box;
  border-inline: 1px solid white;
}
</style>
