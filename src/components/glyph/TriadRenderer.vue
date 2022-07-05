<template>
  <span class="triad" v-if="glyph.MAP(mapDirection)[0]">
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].a"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].b"
    ></glyph-renderer>
    <glyph-renderer
      @pick="onGlyphPick"
      @unpick="onGlyphUnPick"
      :glyph="glyph.MAP(mapDirection)[0].c"
    ></glyph-renderer>
    <number-renderer :number="number"></number-renderer>
  </span>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Glyph } from "@/types/Glyph";
import { Scripture } from "@/types/Scripture";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";

import GlyphRenderer from "./GlyphRenderer.vue";
import NumberRenderer from "./NumberRenderer.vue";

@Options({
  name: "triad-renderer",
  props: {
    selectedGlyphs: Array,
    scripture: Scripture,
    mapDirection: TriadMappingDirection,
    number: Number,
    glyph: Glyph,
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
  //
  constructor(...args: any[]) {
    super(args);
  }
  //
  public onGlyphPick(glyph: Glyph) {
    this.$emit("pick", glyph);
  }

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
  }
}
</style>
