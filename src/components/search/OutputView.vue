<template>
  <div>
    <div v-if="showInput">
      <input class="input" type="text" v-model="think" :size="widthOfInput" />
    </div>
    <div class="notes">
      Select from the three different mapping types of the words, based on the
      <router-link
        :to="{
          name: 'alphabet',
        }"
        >Alphabet Map</router-link
      >. of first occurances of each letter.
    </div>
    <mapping-direction-control
      v-if="scripture.E.length > 0"
      @setDirection="onSetDirection"
    ></mapping-direction-control>
    <scripture-map-renderer
      v-if="scripture"
      :mapDirection="mapDirection"
      :scripture="scripture"
      :wordBorder="true"
    ></scripture-map-renderer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TriadMap } from "@/types/TriadMap";
import { TriadMappingDirection } from "@/types/TriadMappingDirection";
import { Scripture } from "@/types/Scripture";

import ScriptureMapRenderer from "../scripture/ScriptureMapRenderer.vue";
import MappingDirectionControl from "../scripture/MappingDirectionControl.vue";
//
@Options({
  name: "output-view",
  components: {
    ScriptureMapRenderer,
    MappingDirectionControl,
  },
  props: {
    triad: TriadMap,
    showInput: Boolean,
    inputWidth: Number,
    mapDirection: TriadMappingDirection,
    scripture: Scripture,
  },
})
export default class OutputView extends Vue {
  public mapDirection: TriadMappingDirection = TriadMappingDirection.BAC;
  public triad!: TriadMap;
  public showInput!: boolean;
  public inputWidth!: number;
  public scripture!: Scripture;
  //
  private s = "";
  //
  get think() {
    return this.s;
  }
  set think(value: string) {
    if (this.scripture) {
      this.scripture.read(value);
      this.s = value.toLocaleUpperCase();
    }
  }
  //
  get widthOfInput(): number {
    return this.inputWidth ? this.inputWidth : 200;
  }
  //
  public onSetDirection(direction: TriadMappingDirection) {
    this.mapDirection = direction;
  }
}
</script>
<style lang="scss" scoped>
.input {
  background-color: black;
  border: 1px solid white;
  padding: 0.5rem;
  color: white;
  font-size: 1rem;
  outline: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.notes {
  margin-bottom: 2rem;
  color: white;
}

a {
  color: white;
}
</style>
