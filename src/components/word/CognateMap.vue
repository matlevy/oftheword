<template>
  <div class="cognate-map">
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
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { SPIRIT } from "@/types/wordActions/Spirit";

import CognateElement from "./CognateElement.vue";

@Options({
  name: "cognate-map",
  components: {
    CognateElement,
  },
  props: {
    spirit: Object,
  },
})
export default class CognateMap extends Vue {
  public spirit!: SPIRIT;
  public primary!: SPIRIT;

  constructor(...args: any[]) {
    super(args);
    this.reset();
  }

  public render() {
    this.reset();
  }

  private reset() {
    return (this.primary = {
      S: "",
      I: [],
      P: -1,
      T: {},
    });
  }

  public cognatePick(spirit: SPIRIT) {
    this.primary = spirit;
    this.$emit("cognate-pick", spirit);
  }
}
</script>
<style scoped lang="scss"></style>
