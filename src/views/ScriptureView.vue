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
      v-if="scripture"
      :scripture="scripture"
      @cross-ref="onTriadCrossRef"
    ></scripture-map-renderer>
    <div v-for="(crossreference, index) in crossReferences" v-bind:key="index">
      <raw-scripture-renderer
        :verse="crossreference"
        :i="scripture.IN.ref?.verse"
      ></raw-scripture-renderer>
      <scripture-map-renderer
        :word-border="true"
        class="scripture-map"
        :scripture="crossreference"
        @cross-ref="onTriadCrossRef"
      ></scripture-map-renderer>
    </div>
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
import { Triad } from "@/types/Triad";

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
  public crossReferences: Array<Scripture> = [];
  //
  constructor(...args: any[]) {
    super(args);
  }
  public get scripture(): Scripture {
    const c = Number(this.$route.params.chapter) - 1;
    const v = Number(this.$route.params.verse) - 1;
    return Root.getInstance().gen.chapters[c].verse[v];
  }
  public onTriadCrossRef(triad: Triad) {
    if (triad && triad.P) {
      const book: number = Math.floor(triad.P / 100000000);
      const chapter: number = Math.floor(
        (triad.P - book * 100000000) / 1000000
      );
      const verse: number = Math.floor(
        (triad.P - book * 100000000 - chapter * 1000000) / 1000
      );
      const index = Number(
        triad.P.toString().slice(triad.P.toString().length - 3)
      );
      if (chapter && verse) {
        const cr: Scripture =
          Root.getInstance().gen.chapters[chapter - 1].verse[verse - 1];
        this.crossReferences = [];
        this.crossReferences.push(cr);
      }
    }
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
