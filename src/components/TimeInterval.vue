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
      // return this.currentData.find((el) => el?.bt === this.range.bt);
      return isInRange(this.range, this.currentData);
    },
  },
};
</script>
<style>
.time-interval {
  height: 10px;
  width: 10px;
  background: red;
  cursor: pointer;
}
.active {
  background-color: aqua;
}
</style>
