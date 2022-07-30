<template>
  <span
    class="letter"
    :title="letter.T.toString()"
    @click="pick"
    :class="{ [letterClass]: true }"
    >{{ letter.IN.E }}</span
  >
  <span class="letter" v-if="grammar">{{ grammar.IN.E }}</span>
</template>

<script lang="ts">
import { Letter } from "@/types/Letter";
import { Options, Vue } from "vue-class-component";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Options({
  name: "letter-renderer",
  components: {
    FontAwesomeIcon,
  },
  props: {
    selected: Boolean,
    letter: Letter,
    colours: Boolean,
    grammar: Letter,
  },
})
export default class LetterRenderer extends Vue {
  public selected = false;
  public letter!: Letter;
  public colours!: boolean;
  public viewAsNumbers!: boolean;
  public showAsShape!: boolean;
  public grammar!: Letter;
  //
  public get letterClass() {
    if (this.letter.IN.TT && this.colours)
      return this.letter.IN.TT.getPresenterClass(this.letter);
    return "";
  }
  //
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
  color: rgb(0, 132, 255);
}
.letter-o {
  color: yellow;
}
.letter-u {
  color: rgb(193, 0, 223);
}
</style>
