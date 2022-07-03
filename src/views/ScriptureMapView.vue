<template>
  <div class="words" v-if="scripture">
    <span class="word" v-for="(word, index) in scripture.I" v-bind:key="index">
      <span class="stack" v-for="(output, index) in word.A" v-bind:key="index">
        <span class="glyph" v-if="output.IN[0]">
          <glyph-view :glyph="output.IN[0].a"></glyph-view>
          <glyph-view :glyph="output.IN[0].b"></glyph-view>
          <glyph-view :glyph="output.IN[0].c"></glyph-view>
        </span>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Scripture } from "@/types/Scripture";
import { Options, Vue } from "vue-class-component";
import GlyphView from "./GlyphView.vue";

@Options({
  name: "scripture-map-view",
  props: {
    scripture: Scripture,
  },
  components: {
    GlyphView,
  },
})
export default class ScriptureMapView extends Vue {
  public scripture!: Scripture;
}
</script>

<style scoped lang="scss">
.words {
  display: flex;
  flex-wrap: wrap;
}
.word {
  display: flex;
  border-right: 1px dashed white;
  .stack {
    padding: 10px 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    width: 25px;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    .glyph {
      display: flex;
      flex-flow: column;
      text-align: center;
    }
  }
}
</style>
