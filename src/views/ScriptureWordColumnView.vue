<template>
  <div class="word-column">
    <scripture-word-column-renderer :scripture="scripture">
    </scripture-word-column-renderer>
  </div>
</template>

<script lang="ts">
import { Root } from "@/root";
import { Scripture } from "@/types/Scripture";
import { Options, Vue } from "vue-class-component";

import ScriptureWordColumnRenderer from "@/components/scripture/ScriptureWordColumnRenderer.vue";

@Options({
  name: "scripture-word-column-view",
  components: {
    ScriptureWordColumnRenderer,
  },
})
export default class ScriptureWordColumnView extends Vue {
  public get scripture(): Scripture {
    const c = Number(this.$route.params.chapter) - 1;
    const v = Number(this.$route.params.verse) - 1;

    const old: Scripture = Root.getInstance().gen.chapters[c].verse[v];

    const scr: Scripture = new Scripture(old.IN);
    scr.read("NOISREVSEMAJGNIKDES IROHTUAELBIBYLOHEHT ");

    return old;
  }
}
</script>

<style scoped>
.word-column {
  margin: 2rem;
}
</style>
