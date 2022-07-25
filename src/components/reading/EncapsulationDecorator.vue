<template>
  <div class="encapsulation-decorator"></div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  name: "encapsulation-decorator",
  components: {},
  props: {},
})
export default class EncapsulationDecoratorVue extends Vue {
  public mounted() {
    const collection = document.getElementsByTagName<"p">("p");
    console.log(
      [...collection].map((v) => {
        v.innerHTML = v.innerHTML.replace(/\[([A-Za-z]+)\]/gi, (v) => {
          if (v.match(/[A-Z]+/gi)) {
            const text = v.match(/[A-Z]+/gi) || "";
            return `<b class="letters-marker">${text[0]}</b>`;
          }
          return v;
        });
      })
    );
  }
}
</script>
<style lang="scss" scoped>
.encapsulation-decorator {
  display: none;
}
</style>
<style>
.letters-marker {
  border: 1px dotted rgba(255, 255, 255, 0.2);
  padding: 0.1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
</style>
