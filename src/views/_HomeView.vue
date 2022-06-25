<template>
  <div class="home">
    <!-- <input type="text" key="" v-model="inputText" size="88" /><button
      @click="go"
    >
      GO
    </button>
    <br />
    <input type="text" key="" size="94" v-model="reading" />
    <br />
    <input type="text" key="" size="94" v-model="theEarth" />
    <div style="padding-top: 10px">
      <span v-for="(option, index) of options" v-bind:key="index">
        <span
          ><b>{{ index + 1 }}: </b></span
        >
        [ {{ option }} ]&nbsp;&nbsp;</span
      >
    </div>
    <div style="padding-top: 20px">
      <word-map-view :word="theearth"></word-map-view>
    </div>
    <div style="padding-top: 20px">
      <word-view :word="word"></word-view>
    </div> -->
  </div>
</template>

<script lang="ts">
/** 
import { Glyph } from "@/types/Glyph";
import { GlyphMap } from "@/types/GlyphMap";
import { GlyphMapLatin } from "@/types/GlyphMapLatin";
import { TriadMap } from "@/types/TriadMap";
import { TriGlyph } from "@/types/TriGlyph";
import { Word } from "@/types/Word";
import { Options, Vue } from "vue-class-component";
import WordView from "@/views/WordView.vue";
import WordMapView from "@/views/WordMapView.vue";

@Options({
  components: {
    WordView,
    WordMapView,
  },
})
export default class HomeView extends Vue {
  public glyphMap: GlyphMap = GlyphMapLatin.getInstance();
  public triadMap: TriadMap = new TriadMap(this.glyphMap);

  public word = new Word("", this.glyphMap, this.triadMap);
  public theearth = new Word("", this.glyphMap, this.triadMap);

  private w = "";
  private in = "";
  private nextPermitted: Array<string> = [];
  private allTheTriads: Array<TriGlyph> = [];

  constructor(...args: any[]) {
    super(args);
    if (localStorage.getItem("input")) {
      this.w = String(localStorage.getItem("input"));
    }
    this.theearth.mapGlyphsToTriadMap = false;
  }

  public go() {
    if (this.w) {
      this.word.update(this.w);
      this.word.glyphs.forEach((glyph: Glyph) => {
        // console.log(glyph.character, glyph.getConnections());
      });
      localStorage.setItem("input", this.w);
    }
    this.in = "";
    this.nextPermitted = [];
  }

  get allTriads(): Array<TriGlyph> {
    return this.allTheTriads;
  }

  set allTriads(value: Array<TriGlyph>) {
    this.allTheTriads = value;
  }

  get theEarth() {
    return this.theearth.source;
  }

  set theEarth(value: string) {
    this.theearth.source = value;
    this.theearth.update();
  }

  get reading() {
    return this.in;
  }

  set reading(v: string) {
    // v = v.toUpperCase();
    // let diff = v.replace(this.in, "");
    // let lb = this.in.slice(this.in.length - 1, this.in.length);
    // let lbb = this.in.slice(this.in.length - 2, this.in.length - 1);
    // if (
    //   this.nextPermitted.indexOf(diff) != -1 ||
    //   this.nextPermitted.length == 0
    // ) {
    //   this.updateNextPermitted(diff, lb);
    //   this.in = v;
    //   console.log(this.nextPermitted);
    // } else {
    //   //const newTriad = TriadMap.getInstance().mapNew(lbb, lb, diff);
    //   const newLetter = GlyphMap.getInstance().getGlyph(diff);
    //   console.log(lbb + lb + diff);
    //   console.log(newTriad);
    //   console.log(newLetter.getConnections().map((v: Glyph) => v.character));
    //   this.updateNextPermitted(diff, lb);
    //   this.in = v;
    // }
    // this.allTheTriads = TriadMap.getInstance().getAll();
  }

  private updateNextPermitted(c: string, p: string) {
    this.nextPermitted = this.glyphMap
      .getGlyph(p)
      .getConnections()
      .map((v: Glyph) => v.character);

    this.nextPermitted = this.nextPermitted.concat(
      this.glyphMap
        .getGlyph(c)
        .getConnections()
        .map((v: Glyph) => v.character)
    );

    this.nextPermitted = this.nextPermitted.reduce(
      (prev: Array<string>, current: string) => {
        if (prev.indexOf(current) == -1) {
          prev.push(current);
        }
        return prev;
      },
      []
    );
  }

  set inputText(value: string) {
    // console.log(value);
    // this.word.update(value);
    this.w = value;
  }

  get inputText(): string {
    return this.w;
  }

  get options(): Array<string> {
    return this.nextPermitted;
  }
}**/
</script>
<style>
.home {
  background-color: black;
}
</style>
