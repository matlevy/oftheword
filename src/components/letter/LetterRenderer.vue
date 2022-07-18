<template>
  <span class="letter" @click="pick" :class="{ [letterClass]: true }">{{
    letter.IN.E
  }}</span>
</template>

<script lang="ts">
import { Letter } from "@/types/Letter";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "letter-renderer",
  components: {},
  props: {
    selected: Boolean,
    letter: Letter,
    colours: Boolean,
  },
})
export default class LetterRenderer extends Vue {
  public selected = false;
  public letter!: Letter;
  public colours!: boolean;

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
