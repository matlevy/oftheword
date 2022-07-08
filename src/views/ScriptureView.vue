<template>
  <div class="scripture">
    <raw-scripture-renderer
      :verse="scripture"
      :i="scripture.IN.ref?.verse"
    ></raw-scripture-renderer>
    <div class="intro">
      <p>
        The following is a map of each letter within this scripture, using the
        <router-link
          :to="{
            name: 'alphabet',
          }"
          >Alphabet Map</router-link
        >.
      </p>
      <p>
        Each color represents an aspect of spiritual representation, based on
        the positioning of the letter within the alphabet, and its division;
        making it easier to see what each word within a scripture represents,
        and where it maps to for guidance.
      </p>
    </div>
    <scripture-map-renderer
      :word-border="true"
      class="scripture-map"
      :scripture="scripture"
      :map-direction="mapDirection"
      :input="search"
    ></scripture-map-renderer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Root } from "@/root";

import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";

//
@Options({
  components: {
    RawScriptureRenderer,
    ScriptureMapRenderer,
  },
})
export default class ScriptureView extends Vue {
  public mapDirection: TriadMappingDirection = TriadMappingDirection.BAC;
  public search = "";
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
</style>
