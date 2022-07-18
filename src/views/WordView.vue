<template>
  <div class="word-view">
    <h3>{{ word.E }}</h3>
    <div>
      <raw-scripture-renderer
        :verse="primaryWord?.IN.scripture"
        :i="primaryWord?.IN.scripture.IN.ref?.verse"
        @selectWord="atWordSelected"
      ></raw-scripture-renderer>
    </div>
    <div class="word-details">
      <cognate-map
        class="cognate-map"
        @cognatePick="cognatePick"
        :spirit="word.IT"
      ></cognate-map>
      <word-map-renderer
        :filter="letters"
        :word="word"
        :scripture="word?.IN.scripture"
      ></word-map-renderer>
      <bi-glyph-map class="biglyph-map" :word="word"></bi-glyph-map>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "@/root";
import { SPIRIT } from "@/types/wordActions/Spirit";
import { Word } from "@/types/Word";

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
  props: {
    search: String,
    subsearch: String,
  },
})
export default class WordView extends Vue {
  public letters = "";
  public selectedWord!: Word;
  public search?: string;
  public subsearch?: string;

  public mounted() {
    this.$watch("word", () => {
      this.letters = "";
    });
  }
  //
  public atWordSelected(word: Word) {
    this.$router.replace({
      name: "subword",
      params: { search: this.search, subsearch: word.E },
    });
  }
  get word(): Word {
    console.log(this.subsearch);
    if (this.subsearch) {
      const S = this.subsearch.toLocaleUpperCase();
      return Root.getInstance().O.OD.IN.map.get(S) as Word;
    } else if (this.search) {
      const W = this.search.toLocaleUpperCase();
      return Root.getInstance().O.OD.IN.map.get(W) as Word;
    } else {
      return this.selectedWord;
    }
  }
  get primaryWord(): Word {
    if (this.search) {
      const W = this.search.toLocaleUpperCase();
      return Root.getInstance().O.OD.IN.map.get(W) as Word;
    } else {
      return this.selectedWord;
    }
  }
  //
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
    if (e) output.think = e;
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
.cognate-map {
  margin-top: 0;
  margin-bottom: 2rem;
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
