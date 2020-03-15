<template>
  <div>
    <shortcuts
      :toggleShowDistances="toggleShowDistances"
      :toggleOn="toggleOn"
      :toggleShowViewport="toggleShowViewport"
      :changeMode="() => changeMode(null)"
      :resetConfigs="resetConfigs"
      :deleteLine="deleteLine"
      :deleteAllLines="deleteAllLines"
      :changeHRulerPosition="changeHRulerPosition"
      :changeVRulerPosition="changeVRulerPosition"
    />

    <div class="linetef__ruler" v-if="on && !loading">
      <div
        :class="`linetef__origin linetef__origin--${hRulerPosition} linetef__origin--${vRulerPosition}`"
      />

      <horizontal-ruler
        :width="width"
        :onMouseDown="onMouseDown"
        :onTouchStart="onTouchStart"
        :pos="hRulerPosition"
      />
      <vertical-ruler
        :height="height"
        :onMouseDown="onMouseDown"
        :onTouchStart="onTouchStart"
        :pos="vRulerPosition"
      />

      <guide-line
        v-for="(line, index) in horizontalLines"
        :key="`h-${index}`"
        :data="line"
        :onMouseDown="() => moveLine(index, 'desktop', line.type)"
        :onTouchStart="() => moveLine(index, 'mobile', line.type)"
        :color="color"
        :distances="distances"
      />

      <guide-line
        v-for="(line, index) in verticalLines"
        :key="`v-${index}`"
        :data="line"
        :onMouseDown="() => moveLine(index, 'desktop', line.type)"
        :onTouchStart="() => moveLine(index, 'mobile', line.type)"
        :color="color"
        :distances="distances"
      />

      <viewport-box
        v-if="showViewport"
        :color="color"
        :height="height"
        :width="width"
      />
    </div>
  </div>
</template>

<script>
import linesMixin from './mixins/lines';
import configsMixin, { modes } from './mixins/configs';
import { prettyDistance } from './helpers'

import GuideLine from './components/GuideLine';
import HorizontalRuler from './components/HorizontalRuler';
import Shortcuts from './components/Shortcuts';
import VerticalRuler from './components/VerticalRuler';
import ViewportBox from './components/ViewportBox';

export default {
  name: 'Ruler',
  mixins: [configsMixin, linesMixin],
  components: {
    GuideLine,
    HorizontalRuler,
    Shortcuts,
    VerticalRuler,
    ViewportBox,
  },
  data() {
    return {
      loading: true,
      width: null,
      height: null,
      scrollHeight: null,
    };
  },
  created() {
    // Setup listeners
    window.addEventListener('resize', this.getSizes, false);

    // Get initial data
    this.getSizes();
  },
  destroyed() {
    window.removeEventListener('resize', this.getSizes, false);
  },
  methods: {
    getSizes() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.scrollHeight = document.documentElement.scrollHeight;
    },
    persistConfigs() {
      const { color, on, showDistances } = this;
      localStorage.setItem('tintef.extension.ruler.data', JSON.stringify({ color, on, showDistances }));
    },
  },
  computed: {
    distances() {
      const { mode, showDistances, scrollHeight, width } = this;

      const vDistances = [];
      const hDistances = [];

      if (!showDistances) return { vDistances, hDistances};

      const topLeft = { x: -5, y: -5 };
      const bottomRight = { x: width, y: scrollHeight };
      const hLines = [topLeft, ...this.hLines, bottomRight].sort(({ y: y1 }, { y: y2 }) => y1 > y2 ? 1 : -1);
      const vLines = [topLeft, ...this.vLines, bottomRight].sort(({ x: x1 }, { x: x2 }) => x1 > x2 ? 1 : -1);

      if (hLines.length > 2) {
        for (let it = 0; it < hLines.length - 1; it++) {
          const actY = hLines[it].y;
          const nextY = hLines[it + 1].y;

          const dist = Math.abs(actY - nextY) - (it === (hLines.length - 2) ? 5 : 0);

          if (dist >= 20) {
            vDistances.push({
              d: prettyDistance(dist, mode, scrollHeight),
              y1: actY,
              y2: nextY,
              key: Math.random(),
            });
          }
        }
      }

      if (vLines.length > 2) {
        for (let it = 0; it < vLines.length - 1; it++) {
          const actX = vLines[it].x;
          const nextX = vLines[it + 1].x;

          const dist = Math.abs(actX - nextX) - (it === (vLines.length - 2) ? 5 : 0);

          if (dist >= 20) {
            hDistances.push({
              d: prettyDistance(dist, mode, width),
              x1: actX,
              x2: nextX,
              key: Math.random(),
            });
          }
        }
      }

      return { vDistances, hDistances };
    },
    horizontalLines() {
      const { hLines, vLines } = this;

      if (vLines.length > 0 && hLines.length === 0)
        return [{ x: 0, y: 0, type: 'horizontal', special: true }];

      return hLines;
    },
    verticalLines() {
      const { hLines, vLines } = this;

      if (hLines.length > 0 && vLines.length === 0)
        return [{ x: 0, y: 0, type: 'vertical', special: true }];

      return vLines;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  z-index: 2147483646;
}

.linetef {
  &__ruler {
    left: 0;
    position: absolute;
    top: 0;
  }

  &__origin {
    background: white;
    border-color: #ddd;
    border-width: 0 1px 1px 0;
    border-style: solid;
    height: 19px;
    position: fixed;
    width: 19px;
    z-index: 2147483647;
    box-sizing: unset;

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
      transform: scale(1, -1);
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
      transform: scale(-1, 1);
    }

    &--right.linetef__origin--bottom {
      transform: scale(-1, -1);
    }
  }
}
</style>
