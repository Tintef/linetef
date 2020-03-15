<template>
  <div
    :class="`linetef__vertical-ruler linetef__vertical-ruler--${pos}`"
    @mousedown.prevent="(ev) => onMouseDown(ev, 'vertical')"
    v-touch:start="(ev) => onTouchStart(ev, 'vertical')"
  >
    <div
      v-for="i in Math.round(height / 10)"
      :key="i"
      class="linetef__mark"
      :class="{
        'linetef__mark--medium': i % 5 === 0,
        'linetef__mark--big': i % 20 === 0
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'vertical-ruler',
  props: ['height', 'onMouseDown', 'onTouchStart', 'pos'],
};
</script>

<style lang="scss" scoped>
.linetef {
  &__vertical-ruler {
    background: white;
    border-right: 1px solid #ddd;
    border-top: 1px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100vh;
    position: fixed;
    width: 19px;
    cursor: col-resize;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
      transform: scale(-1, 1);
    }
  }

  &__mark {
    border-bottom: 1px solid black;
    min-height: 9px;
    width: 30%;
    box-sizing: unset !important;

    &--medium {
      width: 70%;
    }

    &--big {
      width: 100%;
    }
  }
}
</style>
