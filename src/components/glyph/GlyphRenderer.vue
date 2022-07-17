<template>
  <span class="glyph" @click="pick" :class="{ [glyphClass]: true }">{{
    glyph?.character
  }}</span>
</template>

<script lang="ts">
import { Glyph } from "@/types/Glyph";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "glyph-renderer",
  components: {},
  props: {
    selected: Boolean,
    glyph: Glyph,
    colours: Boolean,
  },
})
export default class GlyphRenderer extends Vue {
  public selected = false;
  public glyph!: Glyph;
  public colours!: boolean;

  public get glyphClass() {
    if (this.glyph?.glyphMap && this.colours)
      return this.glyph.glyphMap?.getPresenterClass(this.glyph);
    return "";
  }

  public pick() {
    if (this.selected) {
      this.selected = false;
      this.$emit("unpick", this.glyph);
    } else {
      this.selected = true;
      this.$emit("pick", this.glyph);
    }
  }
}
</script>
<style>
.glyph {
  min-width: 1rem;
  margin: 0.2rem;
  text-align: center;
  cursor: pointer;
  align-content: center;
  align-items: center;
}
.glyph-a {
  color: red;
}
.glyph-e {
  color: limegreen;
}
.glyph-i {
  color: rgb(0, 100, 250);
}
.glyph-o {
  color: yellow;
}
.glyph-u {
  color: purple;
}
</style>
