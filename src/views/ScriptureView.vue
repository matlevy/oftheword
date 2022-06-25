<template>
  <div class="scripture">
    <input type="text" key="" v-model="think" size="88" />
    <div>{{ _scripture.E }}</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Scripture } from "@/types/Scripture";
//
@Options({
  components: {},
})
export default class ScriptureView extends Vue {
  public _scripture: Scripture;

  private _s = "";

  constructor(...args: any[]) {
    super(args);
    this._scripture = new Scripture({
      ref: {
        book: 1,
        chapter: 1,
        verse: 1,
      },
    });
  }
  //
  set think(value: string) {
    this._scripture.read(value);
    this._s = value.toLocaleUpperCase();
  }
  get think() {
    return this._s;
  }
}
</script>
<style>
.scripture {
  color: white;
}
</style>
