<template>
  <div class="calendar">
    <CalendarRow v-for="day in calendarInitialData" :key="day.day" :day="day" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import CalendarRow from "./CalendarRow.vue";
export default {
  name: "Calendar",

  components: {
    CalendarRow,
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
  display: flex;
  flex-direction: column;
  user-select: none;
}
</style>
