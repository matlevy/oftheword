<template>
  <div class="cognate-map">
    <div class="root">
      <cognate-element
        v-for="(cognate, index) in spirit.I"
        v-bind:key="index"
        :branches="spirit.T"
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
    spirit: Array,
  },
})
export default class CognateMap extends Vue {
  spirit!: SPIRIT;
}
</script>
<style scoped lang="scss"></style>
