<template>
  <div class="custom-view">
    <output-view ref="output" :inputWidth="70" :showInput="true"></output-view>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import OutputView from "@/components/search/OutputView.vue";

@Options({
  name: "custom-view",
  components: {
    OutputView,
  },
})
export default class CustomView extends Vue {
  public text = "";
  public mounted() {
    if (this.$route.query.input) {
      this.text = (this.$route.query.input as string).toLocaleUpperCase();
      (this.$refs.output as OutputView).think = this.text.concat(" ");
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-view {
  margin: 1rem;
  margin-left: 2rem;
  text-align: left;
  color: white;
}
</style>
