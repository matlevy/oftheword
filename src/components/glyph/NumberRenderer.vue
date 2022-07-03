<template>
  <span class="number">{{ number }}</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
  props: {
    number: Number,
  },
})
export default class NumberRenderer extends Vue {
  public number!: number;

  constructor(...args: any[]) {
    super(args);
  }
}
</script>
<style>
.number {
  display: flex;
  flex-flow: column;
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(255, 255, 255, 1);
  color: black;
  min-width: 1rem;
  margin: 0.2rem;
  text-align: center;
  font-size: 0.7rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
