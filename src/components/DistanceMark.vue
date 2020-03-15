<template>
  <div
    class="linetef__distance-mark"
    :class="{
      'linetef__distance-mark--rotated': vertical,
    }"
    :style="{
      color,
      top: `${y}px`,
      left: `${x}px`,
    }"
  >
    {{d}}
  </div>
</template>

<script>
export default {
  name: 'distance-mark',
  props: ['color', 'x', 'y', 'd', 'vertical'],
};
</script>

<style lang="scss" scoped>
.linetef__distance-mark {
  position: absolute;
  width: max-content;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &--rotated {
    transform: rotate(-90deg);
  }
}
</style>
