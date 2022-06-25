<template>
  <div class="word">
    <a
      href="#index"
      v-for="(glyph, index) in word.A"
      v-bind:key="index"
      :title="(index + 1).toString()"
      class="glyph"
    >
      <glyph-view :glyph="glyph"></glyph-view>
    </a>
  </div>
</template>
<script lang="ts">
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import CharacterView from "./CharacterView.vue";

@Options({
  name: "word-view",
  props: {
    word: Word,
  },
  components: {
    CharacterView,
  },
})
export default class WordView extends Vue {
  public word!: Word;
}
</script>

<style scoped lang="scss">
.word {
  display: flex;
  flex-wrap: wrap;
  .char {
    // flex-basis: calc(100% / 22);
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
  }
}
</style>
