<template>
  <div class="biglyph-pairs">
    <div class="biglyph-sub">
      <glyph-renderer :glyph="glyphMap.BG.a" :colours="true"></glyph-renderer>
      <glyph-renderer :glyph="glyphMap.BG.b" :colours="true"></glyph-renderer>
      <font-awesome-icon
        class="arrow"
        icon="fa-solid fa-arrow-right-to-bracket"
      />
      <glyph-renderer :glyph="glyphMap.IN.a" :colours="true"></glyph-renderer>
      <glyph-renderer :glyph="glyphMap.IN.b" :colours="true"></glyph-renderer>
    </div>
    <div class="biglyph-sub" v-for="(pair, index) in tree" v-bind:key="index">
      <font-awesome-icon
        class="arrow"
        icon="fa-solid fa-arrow-right-to-bracket"
      />
      <span
        class="biglyph-sub selectable"
        @click="onSelectPair(pair, tree[index - 1])"
      >
        <glyph-renderer :glyph="pair.a" :colours="true"></glyph-renderer>
        <glyph-renderer :glyph="pair.b" :colours="true"></glyph-renderer>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BiGlyph, BiglyphContainer } from "@/types/BiGlyph";
import { Root } from "@/root";
import { WATERS } from "@/types/wordActions/Waters";
import { Word } from "@/types/Word";

import GlyphRenderer from "@/components/glyph/GlyphRenderer.vue";

@Options({
  components: {
    GlyphRenderer,
    FontAwesomeIcon,
  },
  props: {
    glyphMap: Object,
    word: Word,
  },
})
export default class BiGlyphMapRow extends Vue {
  public glyphMap!: BiglyphContainer;
  public word!: Word;
  //
  private waters: WATERS = Root.getInstance().O.GO;
  //
  public get tree(): BiGlyph[] {
    this.waters.RS(Root.getInstance().O.G, this.glyphMap, 0, 15);
    if (this.glyphMap.PR) {
      return this.treeToArray(this.glyphMap, []).reduce(
        (p: BiGlyph[], v: BiGlyph) => {
          if (
            p.find(
              (value: BiGlyph, index: number) =>
                value.a == v.a && value.b == v.b && index > 1
            ) == undefined
          )
            p.push(v);
          return p;
        },
        []
      );
    }
    return [];
  }
  //
  public treeToArray(
    cont: BiglyphContainer,
    array: BiglyphContainer[]
  ): BiGlyph[] {
    if (cont.PR) {
      array.push(cont.PR);
      this.treeToArray(cont.PR, array);
    }
    return array.map((v: BiglyphContainer) => {
      return v.IN;
    });
  }
  //
  public onSelectPair(BG: BiGlyph, IN: BiGlyph) {
    this.$emit("select", { BG, IN });
  }
}
</script>
<style lang="scss" scoped>
.biglyph-map {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}

.biglyph-sub {
  display: flex;
  flex-flow: row;
  align-content: center;
  align-items: center;
}
.biglyph-pairs {
  padding: 10px 0;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  padding: 10px 0;
  flex-flow: row;
  padding-top: 0;
  padding-bottom: 3px;
}
.arrow {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.selectable {
  cursor: pointer;
}
</style>
