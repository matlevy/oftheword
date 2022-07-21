<template>
  <span
    v-if="!showAsShape"
    class="letter"
    :title="letter.T.toString()"
    @click="pick"
    :class="{ [letterClass]: true }"
    >{{ letterRender }}</span
  >
  <span v-else class="letter">
    <font-awesome-icon
      icon="fa-solid fa-circle-dot"
      :class="{ [letterClass]: true }"
    />
  </span>
</template>

<script lang="ts">
import { Root } from "@/root";
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
    viewAsNumbers: Boolean,
    showAsShape: Boolean,
  },
})
export default class LetterRenderer extends Vue {
  public selected = false;
  public letter!: Letter;
  public colours!: boolean;
  public viewAsNumbers!: boolean;
  public showAsShape!: boolean;
  //
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
  color: rgb(0, 132, 255);
}
.letter-o {
  color: yellow;
}
.letter-u {
  color: rgb(193, 0, 223);
}
</style>
