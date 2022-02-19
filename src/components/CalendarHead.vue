<template>
  <h2 class="calendar-heading">Set shedule</h2>
  <div class="calendar-head">
    <div class="days-head">
      <span
        >all <br />
        day</span
      >
    </div>
    <div class="time-range">
      <p>00:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>03:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>06:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>09:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>12:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>15:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>18:00</p>
      <div></div>
    </div>
    <div class="time-range">
      <p>21:00</p>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarHead",
};
</script>

<style lang="scss">
.calendar-heading {
  text-align: left;
  text-transform: uppercase;
}
.calendar-head {
  display: flex;
  .days-head {
    width: 100px;
    font-size: 1rem;
    display: flex;
    padding-top: 8px;
    span {
      margin-left: auto;
      display: block;
      width: 50px;
      text-align: center;
      text-transform: uppercase;
    }
  }
  .time-range {
    width: 64px;
    text-align: left;
    div {
      height: 16px;
      border-left: 2px solid gray;
    }
  }
}
</style>
