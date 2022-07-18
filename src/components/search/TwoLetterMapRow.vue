<template>
  <div class="biletter-pairs">
    <div class="biletter-sub">
      <letter-renderer
        :letter="letterMap.BG.a"
        :colours="true"
      ></letter-renderer>
      <letter-renderer
        :letter="letterMap.BG.b"
        :colours="true"
      ></letter-renderer>
      <font-awesome-icon
        class="arrow"
        icon="fa-solid fa-arrow-right-to-bracket"
      />
      <letter-renderer
        :letter="letterMap.IN.a"
        :colours="true"
      ></letter-renderer>
      <letter-renderer
        :letter="letterMap.IN.b"
        :colours="true"
      ></letter-renderer>
    </div>
    <div class="biletter-sub" v-for="(pair, index) in tree" v-bind:key="index">
      <font-awesome-icon
        class="arrow"
        icon="fa-solid fa-arrow-right-to-bracket"
      />
      <span
        class="biletter-sub selectable"
        @click="onSelectPair(pair, tree[index - 1])"
      >
        <letter-renderer :letter="pair.a" :colours="true"></letter-renderer>
        <letter-renderer :letter="pair.b" :colours="true"></letter-renderer>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TwoLetters, TwoLetterContainer } from "@/types/TwoLetters";
import { Root } from "@/root";
import { WATERS } from "@/types/wordActions/Waters";

import LetterRenderer from "@/components/letter/LetterRenderer.vue";

@Options({
  components: {
    LetterRenderer,
    FontAwesomeIcon,
  },
  props: {
    letterMap: Object,
  },
})
export default class BiGlyphMapRow extends Vue {
  public letterMap!: TwoLetterContainer;
  //
  private waters: WATERS = Root.getInstance().IN.O.GO;
  //
  public get tree(): TwoLetters[] {
    this.waters.RS(Root.getInstance().IN.O.G, this.letterMap, 0, 15);
    if (this.letterMap.PR) {
      return this.treeToArray(this.letterMap, []).reduce(
        (p: TwoLetters[], v: TwoLetters) => {
          if (
            p.find(
              (value: TwoLetters, index: number) =>
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
    cont: TwoLetterContainer,
    array: TwoLetterContainer[]
  ): TwoLetters[] {
    if (cont.PR) {
      array.push(cont.PR);
      this.treeToArray(cont.PR, array);
    }
    return array.map((v: TwoLetterContainer) => {
      return v.IN;
    });
  }
  //
  public onSelectPair(BG: TwoLetters, IN: TwoLetters) {
    this.$emit("select", { BG, IN });
  }
}
</script>
<style lang="scss" scoped>
.biletter-map {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}

.biletter-sub {
  display: flex;
  flex-flow: row;
  align-content: center;
  align-items: center;
}
.biletter-pairs {
  padding: 10px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 14px;
  display: flex;
  padding: 10px 0;
  flex-flow: row;
  padding-top: 0;
  padding-bottom: 20px;
}
.arrow {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

.selectable {
  cursor: pointer;
}
</style>
