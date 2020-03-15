<template>
  <v-popover offset="5" trigger="hover" placement="bottom">
    <slot />

    <template slot="popover">
      <div class="linetef__shortcut">
        <div v-for="extra in shortcut.extras" :key="`extra--${extra}`">
          {{extra}}
        </div>
        <div class="linetef__key" v-for="key in shortcut.keys" :key="`sckey--${key}`">
          {{key}}
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: 'with-tooltip',
  props: ['shortcut'],
};
</script>

<style lang="scss">
.linetef {
  &__shortcut {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__key {
    align-items: center;
    background: white;
    border-radius: 4px;
    border: 2px solid #ddd;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.2);
    color: #444;
    display: flex;
    font-size: 12px;
    height: 30px;
    justify-content: center;
    margin-left: 20px;
    position: relative;
    user-select: none;
    width: 30px;

    &::before {
      content: "+";
      font-size: 10px;
      color: white;
      left: -40%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:first-of-type {
      margin-left: 0;

      &::before {
        display: none;
      }
    }
  }
}

// Tooltip styles...
.tooltip {
  display: block !important;
  z-index: 10000;

  p { margin: 0; }

  .tooltip-inner {
    background: #444;
    color: white;
    border-radius: 4px;
    padding: 5px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #444;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }

  &.info {
    $color: rgba(#004499, .9);

    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .tooltip-arrow {
      border-color: $color;
    }
  }
}
</style>
