<template>
  <div
    :class="`linetef__horizontal-ruler linetef__horizontal-ruler--${pos}`"
    @mousedown.prevent="(ev) => onMouseDown(ev, 'horizontal')"
    v-touch:start="(ev) => onTouchStart(ev, 'horizontal')"
  >
    <div
      v-for="i in Math.floor(width / 10)"
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
  name: 'horizontal-ruler',
  props: ['onMouseDown', 'onTouchStart', 'width', 'pos'],
};
</script>

<style lang="scss" scoped>
.linetef {
  &__horizontal-ruler {
    background: white;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid transparent;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 19px;
    left: 0;
    position: fixed;
    width: 100vw;
    cursor: row-resize;

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
      transform: scale(1, -1);
    }
  }

  &__mark {
    border-right: 1px solid black;
    height: 30%;
    min-width: 9px;
    box-sizing: unset !important;

    &--medium {
      height: 70%;
    }

    &--big {
      height: 100%;
    }
  }
}
</style>
