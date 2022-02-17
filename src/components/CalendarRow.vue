<template>
  <div class="calendar-row">
    <div class="day">
      <span> {{ day.day }} </span>
    </div>
    <div class="check">
      <input
        type="checkbox"
        :id="day.day"
        :value="day.day"
        v-model="checkbox"
      />
      <label for="all-day-check"></label>
    </div>
    <div class="hours-row" @mousedown="mousedownEvent" @mouseup="mouseupEvent">
      <div
        class="hour"
        v-for="h in row"
        :key="h.et"
        @click="getRange(h)"
        @mousemove="isMousedown ? getRangeByMove(h) : null"
      >
        <TimeInterval :range="h" :currentData="day.hours" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { createRow } from "../helpers/dataConvert.js";
import TimeInterval from "./TimeInterval.vue";
export default {
  name: "CalendarRow",
  components: { TimeInterval },
  props: {
    day: Object,
  },
  data() {
    return {
      row: [],
      isReadyState: true,
      currentData: [],
      checkbox: false,
    };
  },
  created() {
    this.row = createRow();
  },
  computed: mapState({
    isMousedown: (state) => state.isMousedown,
  }),
  watch: {
    checkbox() {
      if (!this.checkbox) {
        this.$store.dispatch("removeRowFromDaysData", {
          day: this.day.day,
        });
      } else {
        this.$store.dispatch("fillRow", { day: this.day.day });
      }
    },
  },
  methods: {
    getRange(rangeObject) {
      // const isExist = this.currentData.find((el) => el.bt === rangeObject.bt);
      // if (isExist) {
      //   this.currentData = this.currentData.filter(
      //     (el) => el.bt !== rangeObject.bt
      //   );
      // } else {
      //   this.currentData.push(rangeObject);
      // }
      this.$store.dispatch("addHoursRange", {
        day: this.day.day,
        range: rangeObject,
      });
    },
    getRangeByMove(rangeObject) {
      if (this.isReadyState) {
        this.$store.dispatch("addHoursRange", {
          day: this.day.day,
          range: rangeObject,
        });
        this.isReadyState = false;
        setTimeout(() => {
          this.isReadyState = true;
        }, 100);
      }
    },
    mousedownEvent() {
      this.$store.dispatch("mousedownStateChange");
      console.log(this.isMousedown);
    },
    mouseupEvent() {
      if (this.isMousedown) {
        this.$store.dispatch("mousedownStateChange");
      }
    },
  },
};
</script>
<style lang="scss">
.calendar-row {
  display: flex;
  justify-content: space-between;
}
.hours-row {
  display: flex;
  justify-content: center;
  .hour {
    height: 30px;
    width: 40px;
    background-color: rgb(171, 171, 238);
    border: 1px solid #ccc;
  }
}
</style>
