<template>
  <div class="cognate-map">
    <div class="root">
      <cognate-element
        v-for="(cognate, index) in spirit.I"
        v-bind:key="index"
        @pick="cognatePick"
        :branches="spirit.T"
        :label="cognate"
        :i="index + 1"
      ></cognate-element>
      <cognate-element
        v-for="(cognate, index) in primary?.I"
        v-bind:key="index"
        @pick="cognatePick"
        :branches="primary.T"
        :label="cognate"
        :i="index + 1"
      ></cognate-element>
      <cognate-element
        v-if="primary"
        @pick="cognatePick"
        label="🗑"
      ></cognate-element>
      <glyph-renderer
        @pick="onGlyphPick"
        @unpick="onGlyphUnPick"
        v-for="(glyph, index) in containingGlyphs"
        v-bind:key="index"
        :colours="true"
        :glyph="glyph"
      ></glyph-renderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { SPIRIT } from "@/types/wordActions/Spirit";

import CognateElement from "./CognateElement.vue";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";

import { Glyph } from "@/types/Glyph";

@Options({
  name: "cognate-map",
  components: {
    CognateElement,
    GlyphRenderer,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateMap extends Vue {
  public spirit!: SPIRIT;
  public primary!: SPIRIT;

  constructor(...args: any[]) {
    super(args);
    this.reset();
  }

  public mounted() {
    this.$watch("spirit", (o: SPIRIT, n: SPIRIT) => {
      this.reset();
    });
  }

  private reset() {
    return (this.primary = {
      S: "",
      I: [],
      P: -1,
      T: {},
    });
  }

  public get containingGlyphs(): Array<Glyph> {
    if (!this.primary || !this.primary.IT) return [];
    return this.primary.IT!.map((v: number) => {
      return this.spirit.SCRIPTURE!.IN.GOD.G.getFromIndex(v) as Glyph;
    });
  }

  public cognatePick(spirit: SPIRIT) {
    if (spirit == null) this.reset();
    this.primary = spirit;
    this.$emit("cognate-pick", spirit);
  }

  public onGlyphPick() {
    return;
  }

  public onGlyphUnPick() {
    return;
  }
}
</script>
<style scoped lang="scss">
.glyph {
  display: inline-block;
  font-weight: bold;
}
</style>
