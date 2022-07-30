<template>
  <router-view :class="{ [baseClass]: true }" />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Root } from "./root";

//
@Options({
  components: {},
})
export default class App extends Vue {
  public get baseClass(): string {
    return Root.getInstance().IN.O.G.rtl ? "hebrew" : "latin";
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  .hebrew {
    font-family: "Times New Roman", Times, serif;
    font-size: 24px;
  }
}
body,
html {
  padding: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  min-height: 100%;
  background-color: rgb(25, 25, 25);
}
h1 {
  text-transform: uppercase;
  font-size: 1.5rem;
}
</style>
