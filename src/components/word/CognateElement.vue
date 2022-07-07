<template>
  <span @click="onPick" class="cognate-element">{{ label }}</span>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  name: "cognate-element",
  components: {},
  props: {
    branches: Object,
    label: String,
  },
})
export default class CognateElement extends Vue {
  public label!: string;
  public branches!: any;

  public onPick() {
    this.$emit(
      "pick",
      this.branches ? Object(this.branches)[this.label] : null
    );
  }
}
</script>
<style scoped lang="scss">
.cognate-element {
  background-color: white;
  padding: 4px;
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;
  min-width: 1rem;
  margin: 0.2rem;
  cursor: pointer;
}
</style>
