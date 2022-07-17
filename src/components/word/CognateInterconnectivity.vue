<template>
  <div class="cognate-interconnectivity">
    <div v-for="(branch, index) in streams" v-bind:key="index">
      <glyph-renderer
        class="glyph"
        :class="{
          ['highlightPrimary']: highlightPrimary(branch, index),
          ['highlightSecondary']: highlightSecondary(branch, index),
        }"
        v-for="(glyph, index) in branch"
        v-bind:key="index"
        :colours="false"
        :glyph="glyph"
      ></glyph-renderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Root } from "@/root";
import { Glyph } from "@/types/Glyph";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { Vue, Options } from "vue-class-component";

import GlyphRenderer from "../glyph/GlyphRenderer.vue";

@Options({
  components: {
    GlyphRenderer,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateInterconnectivity extends Vue {
  public spirit!: SPIRIT;
  public get streams(): Array<Glyph[]> {
    const letters: Array<Glyph[]> = this.streamsAsArray(this.spirit, [])
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
          return Root.getInstance().O.G.getGlyph(v);
        });
      });

    return letters;
  }
  //
  public streamsAsArray(spirit: SPIRIT, array: Array<SPIRIT>): Array<SPIRIT> {
    if (spirit.I && spirit.I.length > 0 && spirit.S.length >= 2) {
      spirit.I.forEach((v: string) => {
        const S: SPIRIT = spirit.T[v];
        if (S.S.length >= 2) {
          array.push(S);
          this.streamsAsArray(S, array);
        }
      });
    }
    return array;
  }
  //
  public highlightPrimary(branch: Glyph[], index: number): boolean {
    const text: string = branch.map((v: Glyph) => v.character).join("");
    const start = text.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && index >= start && index < end;
  }
  //
  public highlightSecondary(branch: Glyph[], index: number): boolean {
    const text: string = branch.map((v: Glyph) => v.character).join("");
    const start = text.indexOf(this.spirit.S);
    const end = start + this.spirit.S.length;
    return start > -1 && (index == start - 1 || index == end);
  }
}
</script>
<style lang="scss" scoped>
.cognate-interconnectivity {
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
}
.glyph {
  display: inline-block;
  font-weight: bold;
  color: white;
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
</style>
