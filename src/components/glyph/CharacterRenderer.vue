<template>
  <span class="char">{{ char }}</span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "character-renderer",
  components: {},
  props: {
    char: String,
  },
})
export default class CharacterRenderer extends Vue {
  public char!: string;

  constructor(...args: any[]) {
    super(args);
  }
}
</script>