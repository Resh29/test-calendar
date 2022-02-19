<template>
  <div class="calendar-buttons">
    <Button value="clear" v-on:btnClick="clear" />
    <Button value="save changes" v-on:btnClick="save" />
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "CalendarButtons",
  components: {
    Button,
  },
  methods: {
    clear() {
      this.$store.dispatch("clearData");
    },
    save() {
      this.$store.dispatch("saveToStorage");
    },
  },
};
</script>

<style lang="scss">
.calendar-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
