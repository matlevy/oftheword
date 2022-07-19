<template>
  <span
    class="letter"
    :title="letter.T.toString()"
    @click="pick"
    :class="{ [letterClass]: true }"
    >{{ letterRender }}</span
  >
</template>

<script lang="ts">
import { Root } from "@/root";
import { Letter } from "@/types/Letter";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "letter-renderer",
  components: {},
  props: {
    selected: Boolean,
    letter: Letter,
    colours: Boolean,
    viewAsNumbers: Boolean,
  },
})
export default class LetterRenderer extends Vue {
  public selected = false;
  public letter!: Letter;
  public colours!: boolean;
  public viewAsNumbers!: boolean;

  public get letterClass() {
    if (this.letter.IN.TT && this.colours)
      return this.letter.IN.TT.getPresenterClass(this.letter);
    return "";
  }

  public pick() {
    if (this.selected) {
      this.selected = false;
      this.$emit("unpick", this.letter);
    } else {
      this.selected = true;
      this.$emit("pick", this.letter);
    }
  }

  public get letterRender(): string {
    if (this.viewAsNumbers) {
      return Root.getInstance()
        .IN.O.G.getLetterGroupPosition(this.letter)
        .toString();
    }
    return this.letter.IN.E;
  }
}
</script>
<style>
.letter {
  min-width: 1rem;
  margin: 0.2rem;
  text-align: center;
  cursor: pointer;
  align-content: center;
  align-items: center;
}
.letter-a {
  color: red;
}
.letter-e {
  color: limegreen;
}
.letter-i {
  color: rgb(0, 100, 250);
}
.letter-o {
  color: yellow;
}
.letter-u {
  color: purple;
}
</style>
