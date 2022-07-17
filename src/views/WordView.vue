<template>
  <div class="word-view">
    <h3>{{ word?.E }}</h3>
    <div>
      <raw-scripture-renderer
        :verse="word?.IN.scripture"
        :i="word?.IN.scripture.IN.ref?.verse"
        @highlight="onScriptureHighlight"
      ></raw-scripture-renderer>
    </div>
    <div class="word-details">
      <word-map-renderer
        :filter="letters"
        :word="word"
        :scripture="word?.IN.scripture"
      ></word-map-renderer>
      <cognate-map @cognatePick="cognatePick" :spirit="IT"></cognate-map>
      <bi-glyph-map class="biglyph-map" :word="word"></bi-glyph-map>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { SPIRIT } from "@/types/wordActions/Spirit";

import CognateMap from "@/components/word/CognateMap.vue";
import WordMapRenderer from "@/components/word/WordMapRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import OutputView from "@/components/search/OutputView.vue";
import BiGlyphMap from "@/components/search/BiGlyphMap.vue";

@Options({
  name: "word-view",
  components: {
    WordMapRenderer,
    CognateMap,
    RawScriptureRenderer,
    BiGlyphMap,
  },
})
export default class WordView extends Vue {
  public letters = "";

  constructor(...args: unknown[]) {
    super(args);
  }
  public mounted() {
    this.$watch("word", () => {
      this.letters = "";
    });
  }
  get word() {
    const word: string = String(this.$route.params.word).toLocaleUpperCase();
    return Root.getInstance().O.OD.IN.map.get(word);
  }
  get IT() {
    return this.word?.IT;
  }
  public cognatePick(spirit: SPIRIT) {
    if (spirit == null) {
      this.letters = "";
    } else {
      this.letters = spirit.S;
    }
  }
  //
  public onScriptureHighlight(e: string) {
    const output: OutputView = this.$refs.output as OutputView;
    output.think = e;
  }
  //
  get triads() {
    return this.word?.IN.GOD.O;
  }
}
</script>
<style scoped lang="scss">
.notes {
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 0.3rem;
}
.word-view {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 2rem;
  max-width: 1000px;
  display: flex;
  text-align: left;
  flex-flow: column;
  margin-bottom: 3rem;
}
.biglyph-map {
  margin-top: 2rem;
}
.word-details {
  margin-left: 2.5rem;
}
h3,
h4 {
  text-align: left;
  font-size: 2rem;
  color: white;
  margin-top: 0;
}
.output {
  margin-top: 2rem;
  margin-left: 0.2rem;
}
</style>
