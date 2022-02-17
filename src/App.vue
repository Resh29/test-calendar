<template>
  <Calendar />
</template>

<script>
import { jsonData } from "./api/fake-data.js";
import { objectToArray } from "./helpers/dataConvert";
import Calendar from "./components/Calendar.vue";
export default {
  name: "App",
  components: { Calendar },
  data() {
    return {
      calendarInitialData: [],
    };
  },
  mounted() {
    const daysData = JSON.parse(localStorage.getItem("daysData")) || null;
    if (daysData) {
      const parsedJsonData = objectToArray(daysData);
      this.calendarInitialData = parsedJsonData;
      this.$store.dispatch("pushCurrentDaysData", parsedJsonData);
    } else {
      console.log(jsonData);
      localStorage.setItem("daysData", JSON.stringify(jsonData));
      const parsedJsonData = Object.keys(jsonData).map((key) => {
        return { [key]: jsonData[key] };
      });
      this.calendarInitialData = parsedJsonData;
      this.$store.dispatch("pushCurrentDaysData", parsedJsonData);
    }
    // localStorage.setItem("daysData", JSON.stringify(""));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
