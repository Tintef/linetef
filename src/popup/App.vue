<template>
  <div class="linetef__popup">
    <shortcuts
      :toggleShowDistances="toggleShowDistances"
      :toggleOn="toggleOn"
      :toggleShowViewport="toggleShowViewport"
      :changeMode="() => changeMode(null)"
      :resetConfigs="resetConfigs"
      :deleteLine="() => {}"
      :deleteAllLines="deleteAllLines"
      :changeHRulerPosition="changeHRulerPosition"
      :changeVRulerPosition="changeVRulerPosition"
    />

    <div class="linetef__column">
      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.showExtension">
          <p>Show Extension</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="on"
          :sync="true"
          @input="toggleOn"
          :labels="{ checked: 'on', unchecked: 'off' }"
          :color="{checked: '#56bdff', unchecked: '#b0e0ff'}"
        />
      </div>

      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.showDistances">
          <p>Show Distances</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="showDistances"
          :sync="true"
          @input="toggleShowDistances"
          :labels="{ checked: 'on', unchecked: 'off' }"
          :color="{checked: '#56bdff', unchecked: '#b0e0ff'}"
        />
      </div>

      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.showViewport">
          <p>Show Viewport</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="showViewport"
          :sync="true"
          @input="toggleShowViewport"
          :labels="{ checked: 'on', unchecked: 'off' }"
          :color="{checked: '#56bdff', unchecked: '#b0e0ff'}"
        />
      </div>
    </div>

    <div class="linetef__column">
      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.toggleModes">
          <p>Change Mode</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="mode === 'px'"
          :sync="true"
          @input="handleChangeMode"
          :labels="{checked: 'px', unchecked: '%'}"
          :color="{checked: '#56bdff', unchecked: '#92A2B3'}"
        />
      </div>

      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.hRuler">
          <p>Horizontal Ruler</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="hRulerPosition === 'top'"
          :sync="true"
          @input="toggleHRulerPosition"
          :labels="{ checked: 'top', unchecked: 'bottom' }"
          :color="{checked: '#56bdff', unchecked: '#92A2B3'}"
        />
      </div>

      <div class="linetef__row">
        <with-tooltip :shortcut="getShortcuts.vRuler">
          <p>Vertical Ruler</p>
        </with-tooltip>
        <toggle-button
          :width="68"
          :value="vRulerPosition === 'left'"
          :sync="true"
          @input="toggleVRulerPosition"
          :labels="{ checked: 'left', unchecked: 'right' }"
          :color="{checked: '#56bdff', unchecked: '#92A2B3'}"
        />
      </div>
    </div>

    <div class="linetef__row linetef__row--mt">
      <p>Guide Color</p>
      <compact-picker
        style="width: 325px;"
        :value="color"
        @input="changeColor"
        :palette="getPalette"
      />
    </div>

    <div class="linetef__row linetef__row--w-button">
      <with-tooltip :shortcut="getShortcuts.resetConfigs">
        <button @click.prevent="resetConfigs">
          Reset Configs
        </button>
      </with-tooltip>
    </div>

    <div class="linetef__row linetef__row--w-button">
      <with-tooltip :shortcut="getShortcuts.deleteAllLines">
        <button @click.prevent="deleteAllLines">
          Delete all Guides
        </button>
      </with-tooltip>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import { ToggleButton } from 'vue-js-toggle-button';

import configsMixin, { modes } from '../mixins/configs';

import Shortcuts from '../components/Shortcuts';
import WithTooltip from '../components/WithTooltip';

import shortcuts from '../data/shortcuts';
import palette from '../data/palette';

export default {
  name: 'Popup',
  mixins: [configsMixin],
  components: {
    'compact-picker': Compact,
    Shortcuts,
    ToggleButton,
    WithTooltip,
  },
  data() {
    return {
      loading: true,
      showShortcuts: false,
    };
  },
  methods: {
    handleChangeMode(value) {
      if (value) {
        this.changeMode('px');
      } else {
        this.changeMode('percentage');
      }
    },
    toggleShowShortcuts() {
      this.showShortcuts = !this.showShortcuts;
    },
    toggleHRulerPosition(value) {
      if (value) {
        this.changeHRulerPosition('top');
      } else {
        this.changeHRulerPosition('bottom');
      }
    },
    toggleVRulerPosition(value) {
      if (value) {
        this.changeVRulerPosition('left');
      } else {
        this.changeVRulerPosition('right');
      }
    },
    deleteAllLines() {
      this.sendMessage('linetef:delete:all:lines')
    }
  },
  computed: {
    getPalette() {
      return palette;
    },
    getShortcuts() {
      return shortcuts;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.linetef {
  &__popup {
    padding: 10px 20px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 475px;
    justify-content: space-between;
    transition: height 200ms linear;
  }

  &__column {
    display: flex;
    flex-direction: column;
    width: 220px;
  }

  &__row {
    display: flex;
    flex-direction: row;
    min-height: 45px;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &--mt {
      margin-top: 15px;
      margin-bottom: 30px;
    }

    &--centered {
      align-items: center;
    }

    p {
      margin: 0 20px 0 0;
      min-width: 70px;
      align-self: flex-start;
    }

    &--w-button {
      width: 50%;
      justify-content: center;
    }

    button {
      background: #56bdff;
      border-radius: 4px;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 13px;
      padding: 5px 10px;
      text-align: center;
      transition: all 200ms linear;

      &:hover {
        background: #239be6;
      }
    }
  }
}
</style>
