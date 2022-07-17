<template>
  <div class="cognate-map">
    <div class="notes">
      A word can be mapped to the first occurances of it component parts. The
      following are first instances of the component part of
      <b>{{ spirit.S }}</b
      >.
    </div>
    <CognateInterconnectivity :spirit="spirit"></CognateInterconnectivity>
    <div class="notes">
      The contructive cognates of the given word can be mapped based on first
      occurace within the scriptures; and by selecting from the given results we
      can identify surrounding glyphs.
    </div>
    <div class="root">
      <cognate-element
        v-for="(cognate, index) in spirit.I"
        v-bind:key="index"
        @pick="cognatePick"
        :branches="spirit.T"
        :label="cognate"
        :i="index + 1"
      ></cognate-element>
      <cognate-element
        v-for="(cognate, index) in primary?.I"
        v-bind:key="index"
        @pick="cognatePick"
        :branches="primary.T"
        :label="cognate"
        :i="index + 1"
      ></cognate-element>
      <font-awesome-icon
        class="trash"
        icon="fa-solid fa-trash-can"
        v-if="primary"
        @click="reset"
      />
    </div>
    <div v-if="selected.length > 0">
      <VerseAsGrid
        v-bind:key="index"
        v-for="(spirit, index) in selected"
        :spirit="spirit"
        :chapter="spirit.SCRIPTURE?.IN.ref?.chapter"
        :verse="spirit.SCRIPTURE?.IN.ref?.verse"
      ></VerseAsGrid>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import CognateElement from "./CognateElement.vue";
import GlyphRenderer from "../glyph/GlyphRenderer.vue";
import VerseAsGrid from "@/components/scripture/VerseAsGrid.vue";
import CognateInterconnectivity from "./CognateInterconnectivity.vue";

@Options({
  name: "cognate-map",
  components: {
    CognateElement,
    GlyphRenderer,
    VerseAsGrid,
    CognateInterconnectivity,
    FontAwesomeIcon,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateMap extends Vue {
  public spirit!: SPIRIT;
  public primary!: SPIRIT;
  public selected: SPIRIT[] = [];

  public mounted() {
    this.$watch("spirit", () => {
      this.reset();
    });
  }

  public reset() {
    this.selected = [];
    this.primary = {
      S: "",
      I: [],
      P: -1,
      T: {},
    };
    this.$emit("cognate-pick", null);
  }

  public cognatePick(spirit: SPIRIT) {
    if (spirit == null) {
      this.reset();
      this.$emit("cognate-pick", null);
    } else {
      this.primary = spirit;
      if (this.selected.indexOf(spirit) == -1) this.selected.push(spirit);
      this.$emit("cognate-pick", spirit);
    }
  }
}
</script>
<style scoped lang="scss">
.glyph {
  display: inline-block;
  font-weight: bold;
  box-sizing: border-box;
}
.cognate-element {
  color: black;
}

.trash {
  color: white;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 0.3rem;
  max-width: 1000px;
}
</style>
