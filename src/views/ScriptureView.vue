<template>
  <div class="scripture">
    <raw-scripture-view
      :verse="scripture"
      :i="scripture.IN.ref?.verse"
    ></raw-scripture-view>
    <scripture-map-view
      class="scripture-map"
      v-if="scripture"
      :scripture="scripture"
    ></scripture-map-view>
    <scripture-word-column-view
      class="grid-view"
      v-if="scripture"
      :scripture="scripture"
    ></scripture-word-column-view>
    <!-- <div class="words">
      <word-map-view
        v-if="selectWord != null"
        :word="selectedWord"
      ></word-map-view>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import RawScriptureView from "@/views/RawScriptureView.vue";
import { Root } from "@/root";
import ScriptureWordColumnView from "./ScriptureWordColumnView.vue";
import ScriptureMapView from "./ScriptureMapView.vue";

//
@Options({
  components: {
    RawScriptureView,
    ScriptureWordColumnView,
    ScriptureMapView,
  },
})
export default class ScriptureView extends Vue {
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
