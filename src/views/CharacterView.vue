<template>
  <span class="char">{{ char }}</span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "glyph-view",
  components: {},
  props: {
    char: String,
  },
})
export default class GlyphView extends Vue {
  public char!: string;

  constructor(...args: any[]) {
    super(args);
  }
}
</script>