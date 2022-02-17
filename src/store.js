import { createStore } from "vuex";
import { isInRange } from "./helpers/range-check";

export const store = createStore({
  state() {
    return {
      isMousedown: false,
      currentDaysData: [],
    };
  },
  actions: {
    mousedownStateChange(state) {
      state.commit("setMousedownState");
    },
    pushCurrentDaysData(state, payload) {
      state.commit("setCurrentDaysData", payload);
    },
    addHoursRange(state, payload) {
      state.commit("hoursRangeStateChange", payload);
    },
    removeRowFromDaysData(state, payload) {
      state.commit("removeAllRanges", payload);
    },
    fillRow(state, payload) {
      state.commit("setFullRow", payload);
    },
  },
  mutations: {
    setFullRow(state, payload) {
      state.currentDaysData
        .find((item) => item.day === payload.day)
        .hours.splice(0, -1, { bt: 0, et: 1439 });
    },
    removeAllRanges(state, payload) {
      console.log(
        (state.currentDaysData.find((item) => item.day === payload.day).hours =
          [])
      );
    },
    hoursRangeStateChange(state, payload) {
      const currentDayArray = state.currentDaysData.find(
        (item) => item.day === payload.day
      );
      if (currentDayArray) {
        if (isInRange(payload.range, currentDayArray.hours)) {
          console.log("is in range");
          return;
        }
        currentDayArray.hours.push(payload.range);
      }
      console.log(state.currentDaysData);
    },
    setMousedownState(state) {
      state.isMousedown = !state.isMousedown;
    },
    setCurrentDaysData(state, payload) {
      state.currentDaysData = payload;
    },
  },
});
