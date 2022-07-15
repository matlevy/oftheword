<template>
  <span class="triad" v-if="glyph.MAP(mapDirection)[0]">
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].a"
      :colours="true"
      :class="{
        dim: dimA,
      }"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].b"
      :colours="true"
      :class="{ dim: dimB }"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].c"
      :colours="true"
      :class="{ dim: dimC }"
    ></glyph-renderer>
    <number-renderer :class="{ dim: I }" :number="number"></number-renderer>
  </span>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Glyph } from "@/types/Glyph";
import { Scripture } from "@/types/Scripture";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";

import GlyphRenderer from "./GlyphRenderer.vue";
import NumberRenderer from "./NumberRenderer.vue";
import { Triad, TriGlyph } from "@/types/Triad";

@Options({
  name: "triad-renderer",
  props: {
    selectedGlyphs: Array,
    scripture: Scripture,
    mapDirection: TriadMappingDirection,
    number: Number,
    glyph: Glyph,
    match: String,
    filter: String,
  },
  components: {
    GlyphRenderer,
    NumberRenderer,
  },
})
export default class TriadRenderer extends Vue {
  public selectedGlyphs: Array<Glyph> = [];
  public scripture!: Scripture;
  public mapDirection!: TriadMappingDirection;
  public number!: number;
  public glyph!: Glyph;
  public match!: string;
  public filter!: string;
  //
  constructor(...args: any[]) {
    super(args);
  }
  //
  public get IS(): TriGlyph {
    const triad: Triad = this.glyph.MAP(this.mapDirection)[0] as Triad;
    const src = this.filter.length > 0 ? this.filter : this.match;
    return {
      a: src.indexOf(triad.a.character) != -1 ? triad.a : undefined,
      b: src.indexOf(triad.b.character) != -1 ? triad.b : undefined,
      c: src.indexOf(triad.c.character) != -1 ? triad.c : undefined,
    };
  }
  //
  public get HAS(): boolean {
    return (
      this.IS.a != undefined ||
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
  public onGlyphPick(glyph: Glyph) {
    this.$emit("pick", glyph);
  }
  //
  public onGlyphUnPick(glyph: Glyph) {
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
