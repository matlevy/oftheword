<template>
  <router-view />
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

//
@Options({
  components: {},
})
export default class App extends Vue {}
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
