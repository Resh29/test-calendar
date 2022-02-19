import { createStore } from "vuex";
import { setData } from "./api/set-data";
import { createSlices } from "./helpers/dataConvert";
import { isInRange } from "./helpers/range-check";

export const store = createStore({
  state() {
    return {
      isMousedown: false,
      currentDaysData: [],
    };
  },
  actions: {
    clearData(state) {
      state.commit("clearCurrentData");
    },
    save(state) {
      state.commit("saveHoursState");
    },
    saveToStorage(state) {
      state.commit("saveDataToLocalStorage");
    },
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
    clearCurrentData(state) {
      state.currentDaysData = state.currentDaysData.map((day) => ({
        day: day.day,
        hours: [],
      }));
    },
    saveDataToLocalStorage(state) {
      const data = Object.fromEntries(
        state.currentDaysData.map((day) => [day.day, [...day.hours]])
      );
      setData(data);
    },
    saveHoursState(state) {
      const result = [];
      for (const item of state.currentDaysData) {
        if (item?.hours?.length) {
          result.push({ day: item.day, hours: [...createSlices(item.hours)] });
        } else {
          result.push({ day: item.day, hours: [] });
        }
      }
      state.currentDaysData = result;
    },
    setFullRow(state, payload) {
      const day = state.currentDaysData.find((el) => el.day === payload.day);
      day.hours = [{ bt: 0, et: 1439 }];
    },
    removeAllRanges(state, payload) {
      state.currentDaysData.find((item) => item.day === payload.day).hours = [];
    },
    hoursRangeStateChange(state, payload) {
      const currentDayArray = state.currentDaysData.find(
        (item) => item.day === payload.day
      );
      if (currentDayArray) {
        if (isInRange(payload.range, currentDayArray.hours)) {
          return;
        }
        currentDayArray.hours.push(payload.range);
      }
    },
    setMousedownState(state) {
      if (state.isMousedown) {
        state.isMousedown = false;
      } else {
        state.isMousedown = true;
      }
    },
    setCurrentDaysData(state, payload) {
      state.currentDaysData = payload;
    },
  },
});
