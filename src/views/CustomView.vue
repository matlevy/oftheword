<template>
  <div class="custom-view">
    <AlphabetMap></AlphabetMap>
    <cognate-map
      v-if="word.E.length > 1"
      class="cognate-map"
      @cognatePick="cognatePick"
      :spirit="word.IT"
    ></cognate-map>
    <two-letter-map
      v-if="word.E.length > 3"
      @select="onSelect"
      class="biletter-map"
      :word="word"
    ></two-letter-map>
    <!--<KeyGenesisVersesAsGrid></KeyGenesisVersesAsGrid>-->
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { SpecialLetterMap } from "@/types/SpecialLetterMap";
import { God } from "@/types/wordActions/God";
import { TripletMap } from "@/types/TripletMap";
import { WordMap } from "@/types/WordMap";
import { Word } from "@/types/Word";
import { Root } from "@/root";
import { TwoLetters } from "@/types/TwoLetters";
import { SPIRIT } from "@/types/wordActions/Spirit";

import OutputView from "@/components/search/OutputView.vue";
import TwoLetterMap from "@/components/search/TwoLetterMap.vue";
import KeyGenesisVersesAsGrid from "@/components/scripture/KeyGenesisVersesAsGrid.vue";
import CognateMap from "@/components/word/CognateMap.vue";
import VerseAsGrid from "@/components/scripture/VerseAsGrid.vue";
import CognateInterconnectivity from "@/components/word/CognateInterconnectivity.vue";
import AlphabetMap from "../components/letter/AlphabetMap.vue";

@Options({
  name: "custom-view",
  components: {
    OutputView,
    TwoLetterMap,
    KeyGenesisVersesAsGrid,
    CognateMap,
    VerseAsGrid,
    CognateInterconnectivity,
    AlphabetMap,
  },
})
export default class CustomView extends Vue {
  public text = "";
  //
  public wordMap: WordMap = new WordMap({
    map: new Map<string, Word>(),
  });
  //
  private GOD: God = new God({
    OD: this.wordMap,
    O: Root.getInstance().IN.O.O,
    G: Root.getInstance().IN.O.G,
    X: SpecialLetterMap.getInstance(),
    GO: Root.getInstance().IN.O.GO,
  });
  //
  public scripture: Scripture = new Scripture({
    GOD: this.GOD,
    map: false,
  });
  //
  public mounted() {
    if (this.$route.query.input) {
      this.text = (this.$route.query.input as string).toLocaleUpperCase();
      (this.$refs.output as OutputView).think = this.text.concat(" ");
    }
  }
  //
  public get word() {
    if (this.scripture && this.scripture.I.length > 0) {
      return this.scripture.I[0];
    }
    return new Word({
      GOD: this.GOD,
      scripture: this.scripture,
      start: -1,
      end: -1,
      map: false,
    });
  }
  //
  public get triads(): TripletMap {
    return Root.getInstance().letterMap;
  }
  //
  public cognatePick(s: SPIRIT) {
    console.log("todo", s);
  }
  //
  public onSelect(event: { word: Word; pair: TwoLetters }) {
    console.log(event);
  }
}
</script>
<style lang="scss" scoped>
.custom-view {
  margin: 1rem;
  margin-left: 2rem;
  text-align: left;
  color: white;
  margin-bottom: 2rem;
}
.cognate-map {
  margin-top: 2rem;
}
.biletter-map {
  margin-top: 2rem;
}
</style>
