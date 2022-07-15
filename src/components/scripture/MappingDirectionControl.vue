<template>
  <div class="views">
    <button class="view-type" @click="setMappingDirection(TO)">TO</button>
    <button class="view-type" @click="setMappingDirection(RO)">RO</button>
    <button class="view-type" @click="setMappingDirection(UT)">UT</button>
  </div>
</template>
<script lang="ts">
import { TriadMappingDirection } from "@/types/TriadMappingDirection";
import { Vue, Options } from "vue-class-component";

@Options({
  name: "mapping-direction-conntrol",
})
export default class MappingDirectionControl extends Vue {
  public direction: TriadMappingDirection = TriadMappingDirection.BAC;

  public TO: TriadMappingDirection = TriadMappingDirection.BAC;
  public UT: TriadMappingDirection = TriadMappingDirection.CAB;
  public RO: TriadMappingDirection = TriadMappingDirection.ACB;

  public setMappingDirection(direction: TriadMappingDirection) {
    this.direction = direction;
    this.$emit("setDirection", this.direction);
  }
}
</script>
<style lang="scss" scoped>
.views {
  background: black;
  display: block;
  .view-type {
    background-color: white;
    margin-right: 0.5rem;
    color: black;
    padding: 0.5rem;
    cursor: pointer;
    border: none;
  }
}
</style>
