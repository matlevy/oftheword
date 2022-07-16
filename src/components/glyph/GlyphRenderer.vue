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
  border: 1px solid purple;
  background-color: purple;
  color: white;
}
</style>
