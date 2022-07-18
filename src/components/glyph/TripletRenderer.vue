<template>
  <span class="triad" v-if="glyph.MAP(mapDirection)[0]">
    <glyph-renderer
      @pick="onLetterPick"
      @unpick="onLetterUnPicked"
      :glyph="glyph.MAP(mapDirection)[0].a"
      :colours="true"
      :class="{
        dim: dimA,
      }"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onLetterPick"
      @unpick="onLetterUnPicked"
      :glyph="glyph.MAP(mapDirection)[0].b"
      :colours="true"
      :class="{ dim: dimB }"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onLetterPick"
      @unpick="onLetterUnPicked"
      :glyph="glyph.MAP(mapDirection)[0].c"
      :colours="true"
      :class="{ dim: dimC }"
    ></glyph-renderer>
    <number-renderer :class="{ dim: I }" :number="number"></number-renderer>
  </span>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Letter } from "@/types/Letter";
import { Scripture } from "@/types/Scripture";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";
import { Triplet, TripletInterface } from "@/types/Triplet";

import GlyphRenderer from "./GlyphRenderer.vue";
import NumberRenderer from "./NumberRenderer.vue";

@Options({
  name: "triad-renderer",
  props: {
    selectedGlyphs: Array,
    scripture: Scripture,
    mapDirection: TripletMappingDirection,
    number: Number,
    glyph: Letter,
    match: String,
    filter: String,
  },
  components: {
    GlyphRenderer,
    NumberRenderer,
  },
})
export default class TripletRenderer extends Vue {
  public selectedGlyphs: Array<Letter> = [];
  public scripture!: Scripture;
  public mapDirection!: TripletMappingDirection;
  public number!: number;
  public glyph!: Letter;
  public match!: string;
  public filter!: string;
  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    super(args);
  }
  //
  public get IS(): TripletInterface {
    const triad: Triplet = this.glyph.MAP(this.mapDirection)[0] as Triplet;
    const src = this.filter.length > 0 ? this.filter : this.match;
    return {
      a: src.indexOf(triad.a.IN.E) != -1 ? triad.a : undefined,
      b: src.indexOf(triad.b.IN.E) != -1 ? triad.b : undefined,
      c: src.indexOf(triad.c.IN.E) != -1 ? triad.c : undefined,
    };
  }
  //
  public get HAS(): boolean {
    return (
      this.IS.a != undefined ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.IS.b! == undefined ||
      this.IS.c != undefined
    );
  }
  //
  public get dimA() {
    if (this.filter?.length > 0) {
      return this.IS.a != this.glyph.MAP(this.mapDirection)[0].a;
    }
    return (
      this.I &&
      !(
        this.IS.b == this.glyph.MAP(this.mapDirection)[0].b ||
        this.IS.c == this.glyph.MAP(this.mapDirection)[0].c
      )
    );
  }
  public get dimB() {
    if (this.filter?.length > 0) {
      return this.IS.a != this.glyph.MAP(this.mapDirection)[0].a;
    }
    return this.I && this.IS.b != this.glyph.MAP(this.mapDirection)[0].b;
  }
  public get dimC() {
    if (this.filter?.length > 0) {
      return this.IS.a != this.glyph.MAP(this.mapDirection)[0].a;
    }
    return this.I && this.IS.c != this.glyph.MAP(this.mapDirection)[0].c;
  }
  //
  public get I(): boolean {
    return this.match?.length > 0;
  }
  //
  public onLetterPick(glyph: Letter) {
    this.$emit("pick", glyph);
  }
  //
  public onLetterUnPicked(glyph: Letter) {
    this.$emit("unpick", glyph);
  }
}
</script>
<style scoped lang="scss">
.triad {
  padding: 10px 0;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  width: 25px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  .glyph {
    display: flex;
    flex-flow: column;
    text-align: center;
    &.dim {
      opacity: 0.2;
    }
  }
}
</style>
