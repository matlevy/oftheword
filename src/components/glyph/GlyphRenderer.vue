<template>
  <span class="glyph">{{ glyph.character }}</span>
</template>

<script lang="ts">
import { Glyph } from "@/types/Glyph";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "glyph-renderer",
  components: {},
  props: {
    glyph: Glyph,
  },
})
export default class GlyphRenderer extends Vue {
  public glyph!: Glyph;

  constructor(...args: any[]) {
    super(args);
  }
}
</script>
