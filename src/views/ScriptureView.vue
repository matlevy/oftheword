<template>
  <div class="scripture" v-on:keyup="onKeyUp">
    <raw-scripture-renderer
      :verse="scripture"
      :i="scripture.IN.ref?.verse"
    ></raw-scripture-renderer>
    <!-- <scripture-map-renderer
      :word-border="true"
      class="scripture-map"
      :scripture="scripture"
      :map-direction="mapDirection"
      :input="search"
    ></scripture-map-renderer> -->
    <VerseAsGrid
      :chapter="scripture.IN.ref?.chapter"
      :verse="scripture.IN.ref?.verse"
    ></VerseAsGrid>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Root } from "@/root";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";

import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import VerseAsGrid from "../components/scripture/VerseAsGrid.vue";

//
@Options({
  components: {
    RawScriptureRenderer,
    ScriptureMapRenderer,
    VerseAsGrid,
  },
})
export default class ScriptureView extends Vue {
  public mapDirection: TripletMappingDirection = TripletMappingDirection.BAC;
  public search = "";
  //
  public get scripture(): Scripture {
    const c = Number(this.$route.params.chapter) - 1;
    const v = Number(this.$route.params.verse) - 1;
    const scripture: Scripture = Root.getInstance().gen.chapters[c].verse[v];
    return scripture;
  }
  //
  public onKeyUp(e: Event) {
    console.log(e);
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
  text-align: left;
}

.intro {
  margin-top: 2rem;
  margin-left: 2.5rem;
}
.intro a {
  color: white;
}
.words {
  display: flex;
  flex-wrap: wrap;
}
.scripture-map,
.grid-view {
  margin-left: 2rem;
  margin-top: 1rem;
}

.scripture-map {
  margin-left: 2.5rem;
}
</style>
