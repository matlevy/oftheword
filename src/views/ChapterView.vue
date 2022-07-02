<template>
    <div></div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component"
import RawScriptureView from "./RawScriptureView.vue"

@Options({
  name: "glyph-view",
  components: {
    RawScriptureView,
  }
})
export default class ChapterView extends Vue {

}
</script>