<template>
  <div class="calendar-row">
    <div class="check">
      <input
        type="checkbox"
        :id="day.day"
        :value="day.day"
        v-model="checkbox"
        :checked="isFullRow"
      />
      <label for="all-day-check">
        <div class="day">
          <span> {{ day.day }} </span>
        </div>
        <div class="check-mark" @click="checkbox = !checkbox">
          <span>&#10004;</span>
        </div>
      </label>
    </div>
    <div class="hours-row" @mousedown="mousedownEvent" @mouseup="mouseupEvent">
      <div
        class="hour"
        v-for="h in row"
        :key="h.et"
        @mousemove="isMousedown ? getRangeByMove(h) : null"
        @mousedown="getRange(h)"
      >
        <TimeInterval :range="h" :currentData="daysData.hours" />
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
      checkbox: false,
      isFullRow: false,
    };
  },
  mounted() {
    this.row = createRow();
    this.checkIsAllDay();
  },
  updated() {
    this.checkIsAllDay();
  },
  computed: mapState({
    isMousedown: (state) => state.isMousedown,
    daysData: function (state) {
      return state.currentDaysData.find((item) => item.day === this.day.day);
    },
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
    daysData() {
      this.checkIsAllDay();
    },
  },

  methods: {
    checkIsAllDay() {
      const hours = this.daysData.hours;
      if (hours.length === 1) {
        if (hours[0].bt === 0 && hours[0].et >= 1439) {
          this.isFullRow = true;
          this.checkbox = true;
        } else {
          this.isFullRow = false;
          this.checkbox = false;
        }
      } else {
        this.isFullRow = false;
        this.checkbox = false;
      }
    },
    getRange(rangeObject) {
      if (rangeObject) {
        this.$store.dispatch("addHoursRange", {
          day: this.day.day,
          range: rangeObject,
        });
      }
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
        }, 30);
      }
    },
    mousedownEvent() {
      this.$store.dispatch("mousedownStateChange");
    },
    mouseupEvent() {
      if (this.isMousedown) {
        this.$store.dispatch("mousedownStateChange");
        this.$store.dispatch("save");
      }
    },
  },
};
</script>
<style lang="scss">
.calendar-row {
  display: flex;
  .check {
    width: 100px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.486);
    .day {
      height: 100%;
      width: 50px;
      color: lightgray;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    label {
      display: flex;
      height: 100%;
      width: 100%;
      .check-mark {
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: gray;
        span {
          display: none;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          color: gray;
          background-color: lightgray;
        }
      }
    }
    input {
      display: none;
      &:checked ~ label {
        .check-mark span {
          display: block;
        }
        .day {
          color: gray;
          background-color: lightgray;
        }
      }
    }
  }
}
.hours-row {
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(128, 128, 128, 0.486);
  &:last-child {
    border-bottom: 1px solid rgba(128, 128, 128, 0.486);
  }
  .hour {
    height: 50px;
    width: 20px;
    border-left: 1pt solid rgba(128, 128, 128, 0.486);
    &:last-child {
      border-right: 1px solid rgba(128, 128, 128, 0.486);
    }
  }
}
</style>
