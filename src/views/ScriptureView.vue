<template>
  <div class="scripture">
    <raw-scripture-renderer
      :verse="scripture"
      :i="scripture.IN.ref?.verse"
    ></raw-scripture-renderer>
    <scripture-map-renderer
      class="scripture-map"
      v-if="scripture"
      :scripture="scripture"
    ></scripture-map-renderer>
    <scripture-word-column-renderer
      class="grid-view"
      v-if="scripture && gridView"
      :scripture="scripture"
    ></scripture-word-column-renderer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Root } from "@/root";

import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import ScriptureWordColumnRenderer from "@/components/scripture/ScriptureWordColumnRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";

//
@Options({
  components: {
    RawScriptureRenderer,
    ScriptureWordColumnRenderer,
    ScriptureMapRenderer,
  },
})
export default class ScriptureView extends Vue {
  public gridView = false;
  //
  constructor(...args: any[]) {
    super(args);
  }
  public get scripture(): Scripture {
    const c = Number(this.$route.params.chapter) - 1;
    const v = Number(this.$route.params.verse) - 1;
    return Root.getInstance().gen.chapters[c].verse[v];
  }
}
</script>
<style scoped>
.scripture {
  color: white;
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
}
.words {
  display: flex;
  flex-wrap: wrap;
}
.scripture-map,
.grid-view {
  margin-left: 2rem;
  margin-top: 2rem;
}
</style>
