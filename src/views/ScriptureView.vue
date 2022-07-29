<template>
  <div class="scripture">
    <raw-scripture-renderer
      :verse="scripture"
      :i="scripture.IN.ref?.verse"
    ></raw-scripture-renderer>
    <!-- <scripture-map-renderer
      :word-border="true"
      class="scripture-map"
      :scripture="scripture"
      :map-direction="mapDirection"
      :input="search"
    ></scripture-map-renderer> -->
    <VerseAsGrid class="grid" :scripture="scripture"></VerseAsGrid>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
import { Root } from "@/root";
import { TripletMappingDirection } from "@/types/TripletMappingDirection";

import ScriptureMapRenderer from "@/components/scripture/ScriptureMapRenderer.vue";
import RawScriptureRenderer from "@/components/scripture/RawScriptureRenderer.vue";
import VerseAsGrid from "../components/scripture/VerseAsGrid.vue";

//
@Options({
  components: {
    RawScriptureRenderer,
    ScriptureMapRenderer,
    VerseAsGrid,
  },
})
export default class ScriptureView extends Vue {
  public mapDirection: TripletMappingDirection = TripletMappingDirection.BAC;
  public search = "";
  //
  public get scripture(): Scripture {
    const c = Number(this.$route.params.chapter) - 1;
    const v = Number(this.$route.params.verse) - 1;
    const scripture: Scripture = Root.getInstance().gen.chapters[c].verse[v];
    return scripture;
  }
  //
  public get verse(): number {
    return Number(this.$route.params.verse);
  }
  //
  public get chapter(): number {
    return Number(this.$route.params.chapter);
  }
  //
  public get bookAsString(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Root.getInstance().getBookName(this.scripture.IN.ref!.book);
  }
  //
  public get maxVerses(): number {
    return Root.getInstance().BIBLE.getVerseCount(
      this.bookAsString,
      this.scripture.IN.ref?.chapter || 0
    );
  }
  //
  public get maxChapters(): number {
    return Root.getInstance().BIBLE.getChapterCount(this.bookAsString);
  }
  //
  public get endOfLastChapter(): number {
    return Root.getInstance().BIBLE.getVerseCount(
      this.bookAsString,
      Math.max((this.scripture.IN.ref?.chapter || 0) - 1, 1)
    );
  }
  //
  public get nextChapter(): number {
    return this.chapter < this.maxChapters ? this.chapter + 1 : 1;
  }
  //
  public get nextVerse(): number {
    return this.verse < this.maxVerses ? this.verse + 1 : 1;
  }
  //
  public get previousChapter(): number {
    return this.chapter > 1 ? this.chapter - 1 : this.chapter;
  }
  //
  public mounted() {
    window.addEventListener("keypress", (e) => this.onKeyUp(e));
  }
  //
  public get scriptureMatrix(): string[] {
    const chunks = new Array(Math.ceil(this.scripture.E.length / 22));
    return this.scripture.E.split(/([a-z]{22,22})/gi).filter((v) => v != "");
  }
  //
  public onKeyUp(e: KeyboardEvent) {
    if (this.$route.name == "scripture") {
      switch (e.code) {
        case "BracketRight":
          this.gotoScripture(
            this.nextVerse == 1 ? this.chapter + 1 : this.chapter,
            this.nextVerse
          );
          break;
        case "BracketLeft":
          this.gotoScripture(
            this.verse > 1 ? this.chapter : this.previousChapter,
            this.verse > 1 ? this.verse - 1 : this.endOfLastChapter
          );
          break;
        default:
          if (/[0-9]/gi.test(e.key)) {
            const index = Number(e.key) == 0 ? 10 : Number(e.key) - 1;
            if (this.scriptureMatrix[index]) {
              this.$router.push({
                name: "alphabetgrid-by-stream",
                params: {
                  book: this.scripture.IN.ref?.book,
                  chapter: this.scripture.IN.ref?.chapter,
                  verse: this.scripture.IN.ref?.verse,
                  stream: this.scriptureMatrix[index],
                },
              });
            }
          }
          if (/[a-zA-Z]/gi.test(e.key)) {
            let code =
              Root.getInstance()
                .IN.O.G.getAllAsString()
                .indexOf(e.key.toLocaleUpperCase()) + 1;
            if (e.shiftKey) code = code + 26;
            // navigate to verse by letter
            if (code <= this.maxVerses) {
              this.gotoScripture(this.chapter, code);
            }
          }
      }
    }
  }
  //
  public gotoScripture(chapter: number, verse: number) {
    this.$router.push({
      name: "scripture",
      params: {
        chapter: chapter,
        verse: verse,
      },
    });
  }
}
</script>
<style scoped>
.scripture {
  color: white;
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
  text-align: left;
}

.intro {
  margin-top: 2rem;
  margin-left: 2.5rem;
}
.intro a {
  color: white;
}
.words {
  display: flex;
  flex-wrap: wrap;
}
.scripture-map,
.grid-view {
  margin-left: 2rem;
  margin-top: 1rem;
}

.grid {
  width: fit-content;
}

.scripture-map {
  margin-left: 2.5rem;
}
</style>
