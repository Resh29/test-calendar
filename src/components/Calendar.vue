<template>
  <div class="calendar">
    <CalendarHead />
    <CalendarRow
      v-for="day in calendarInitialData"
      :key="day.day"
      :day="Object.assign({}, day)"
    />
    <CalendarButtons />
  </div>
</template>
<script>
import { mapState } from "vuex";
import CalendarRow from "./CalendarRow.vue";
import CalendarHead from "./CalendarHead.vue";
import CalendarButtons from "./CalendarButtons.vue";
export default {
  name: "Calendar",

  components: {
    CalendarRow,
    CalendarHead,
    CalendarButtons,
  },
  computed: mapState({
    calendarInitialData: (state) => state.currentDaysData,
  }),

  data() {
    return {};
  },
};
</script>
<style lang="scss">
.calendar {
  max-width: 620px;
  display: flex;
  flex-direction: column;
  user-select: none;
  margin: auto;
  text-align: center;
  color: gray;
}
</style>
