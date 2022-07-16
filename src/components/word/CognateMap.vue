<template>
  <div class="cognate-map">
    <div class="notes">
      The contructive cognates of the given word can be mapped based on first
      occurace within the scriptures; and by selecting from the given results we
      can identify surrounding glyphs.
    </div>
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
    <div v-if="selected.length > 0">
      <VerseAsGrid
        v-bind:key="index"
        v-for="(spirit, index) in selected"
        :spirit="spirit"
        :chapter="spirit.SCRIPTURE?.IN.ref?.chapter"
        :verse="spirit.SCRIPTURE?.IN.ref?.verse"
      ></VerseAsGrid>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { Glyph } from "@/types/Glyph";

import CognateElement from "./CognateElement.vue";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";
import VerseAsGrid from "@/components/scripture/VerseAsGrid.vue";

@Options({
  name: "cognate-map",
  components: {
    CognateElement,
    GlyphRenderer,
    VerseAsGrid,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateMap extends Vue {
  public spirit!: SPIRIT;
  public primary!: SPIRIT;
  public selected: SPIRIT[] = [];

  constructor(...args: unknown[]) {
    super(args);
    this.reset();
  }

  public mounted() {
    this.$watch("spirit", () => {
      this.reset();
    });
  }

  private reset() {
    this.selected = [];
    return (this.primary = {
      S: "",
      I: [],
      P: -1,
      T: {},
    });
  }

  public get containingGlyphs(): Array<Glyph> {
    if (!this.primary || !this.primary.IT) return [];
    return this.primary.IT?.map((v: number) => {
      return this.spirit.SCRIPTURE?.IN.GOD.G.getFromIndex(v) as Glyph;
    });
  }

  public cognatePick(spirit: SPIRIT) {
    if (spirit == null) {
      this.reset();
    } else {
      this.primary = spirit;
      if (this.selected.indexOf(spirit) == -1) this.selected.push(spirit);
      this.$emit("cognate-pick", spirit);
    }
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
