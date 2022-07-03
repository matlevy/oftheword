<template>
  <span class="glyph" :class="{ [glyphClass]: true }">{{
    glyph.character
  }}</span>
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

  public get glyphClass() {
    return this.glyph.glyphMap.getPresenterClass(this.glyph);
  }
}
</script>
<style>
.glyph {
  min-width: 1rem;
  margin: 0.2rem;
  text-align: center;
}
.glyph-a {
  border: 1px solid red;
  background-color: red;
}
.glyph-e {
  border: 1px solid limegreen;
  background-color: limegreen;
  color: black;
}
.glyph-i {
  border: 1px solid rgb(0, 100, 250);
  background-color: rgb(0, 100, 250);
}
.glyph-o {
  border: 1px solid yellow;
  background-color: yellow;
  color: black;
}
.glyph-u {
  border: 1px solid blue;
}
</style>
