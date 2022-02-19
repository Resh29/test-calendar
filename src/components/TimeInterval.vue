<template>
  <div class="time-interval" :class="{ active: isActive }"></div>
</template>
<script>
import { isInRange } from "../helpers/range-check.js";
export default {
  name: "TimeInterval",
  props: {
    range: Object,
    currentData: Array,
  },
  computed: {
    isActive() {
      return isInRange(this.range, this.currentData);
    },
  },
};
</script>
<style>
.time-interval {
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
}
.active {
  background-color: darkgray;
}
</style>
