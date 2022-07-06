<template>
  <div class="word-view">
    <h3>{{ word?.E }}</h3>
    <div>
      <word-map-renderer
        :word="word"
        :scripture="word?.IN.scripture"
      ></word-map-renderer>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import WordMapRenderer from "@/components/word/WordMapRenderer.vue";
import { Root } from "@/root";

@Options({
  name: "word-view",
  components: {
    WordMapRenderer,
  },
})
export default class WordView extends Vue {
  get word() {
    const word: string = String(this.$route.params.word).toLocaleUpperCase();
    return Root.getInstance().O.OD.IN.map.get(word);
  }
}
</script>
<style scoped lang="scss">
.word-view {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 2rem;
  max-width: 1000px;
  display: flex;
  text-align: left;
  flex-flow: column;
}
h3,
h4 {
  text-align: left;
  font-size: 2rem;
  color: white;
  margin-top: 0;
}
</style>
