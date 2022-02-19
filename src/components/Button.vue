<template>
  <button type="button" @click="$emit('btnClick')" class="btn">
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    value: String,
  },
};
</script>

<style lang="scss">
.btn {
  min-width: 100px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  color: lightgray;
  border: none;
  border-radius: 5px;
  padding: 8px 24px;
  background-color: gray;
  margin-left: 1rem;
  box-shadow: 0px 5px 10px rgba($color: #a1a1a1, $alpha: 1);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: lighten(gray, 20%);
    color: darken(lightgray, 30%);
  }
}
</style>
