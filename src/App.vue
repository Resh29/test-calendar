<template>
  <Calendar />
</template>

<script>
import { getData } from "./api/get-data.js";
import Calendar from "./components/Calendar.vue";
export default {
  name: "App",
  components: { Calendar },
  data() {
    return {};
  },
  mounted() {
    const daysData = getData();
    this.$store.dispatch("pushCurrentDaysData", daysData);
  },
};
</script>

<style>
body {
  margin: 0;
  background: rgba(128, 128, 128, 0.055);
}
#app {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
}
</style>
