<template>
  <div
    @mousedown.prevent="onMouseDown"
    v-touch:start="onTouchStart"
    class="linetef__container"
    :class="{
        'linetef__container--horizontal': data.type === 'horizontal',
        'linetef__container--vertical': data.type === 'vertical',
      }"
    :style="{
      top: data.type === 'horizontal' ? `${data.y}px` : '0',
      left: data.type === 'vertical' ? `${data.x}px` : '0',
    }"
  >
    <div
      :style="{ background: data.special ? 'transparent' : color }"
      :class="{
        'linetef__line--horizontal': data.type === 'horizontal',
        'linetef__line--vertical': data.type === 'vertical',
      }"
    />

    <template v-if="data.type === 'horizontal'">
      <distance-mark
        v-for="dist in distances.hDistances"
        :key="`${dist.key}-${dist.d}`"
        :d="dist.d"
        :x="dist.x1 + (dist.x2 - dist.x1) / 2 - 40"
        :y="data.special ? 20 : -20"
        :color="color"
      />
    </template>
    <template v-else>
      <distance-mark
        v-for="dist in distances.vDistances"
        :key="`${dist.key}-${dist.d}`"
        :d="dist.d"
        :x="data.special ? -15 : -55"
        :y="dist.y1 + (dist.y2 - dist.y1) / 2 - 5"
        :vertical="true"
        :color="color"
      />
    </template>
  </div>
</template>

<script>
import DistanceMark from './DistanceMark';

export default {
  name: 'guide-line',
  components: { DistanceMark },
  props: {
    data: {
      type: Object,
      required: true,
      // validator: TODO;
    },
    onMouseDown: {
      type: Function,
      default: () => {},
    },
    onTouchStart: {
      type: Function,
      default: () => {},
    },
    color: {
      type: String,
      default: 'red',
    },
    distances: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.linetef {
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2147483645;


    &--horizontal {
      padding: 5px 0;
      cursor: row-resize;
    }

    &--vertical {
      padding: 0 5px;
      cursor: col-resize;
    }
  }

  &__line--horizontal {
    width: 100vw;
    height: 1px;
  }

  &__line--vertical {
    width: 1px;
    height: 100vh;
    position: fixed;
  }
}
</style>
