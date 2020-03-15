<template>
  <GlobalEvents
    @keyup.prevent.ctrl.shift.d.exact="toggleShowDistances"
    @keyup.prevent.ctrl.shift.o.exact="toggleOn"
    @keyup.prevent.ctrl.shift.v.exact="toggleShowViewport"
    @keyup.prevent.ctrl.shift.m.exact="changeMode"
    @keyup.prevent.ctrl.r.exact="resetConfigs"
    @keyup.prevent.delete.exact="deleteLine"
    @keyup.prevent.ctrl.delete.exact="deleteAllLines"
    @keyup.prevent.ctrl.shift.t.exact="() => changeHRulerPosition('top')"
    @keyup.prevent.ctrl.shift.b.exact="() => changeHRulerPosition('bottom')"
    @keyup.prevent.ctrl.shift.l.exact="() => changeVRulerPosition('left')"
    @keyup.prevent.ctrl.shift.r.exact="() => changeVRulerPosition('right')"
  />
</template>

<script>
import GlobalEvents from 'vue-global-events';

export default {
  name: 'shortcuts',
  components: { GlobalEvents },
  props: [
    'toggleShowDistances',
    'toggleOn',
    'toggleShowViewport',
    'changeMode',
    'resetConfigs',
    'deleteLine',
    'deleteAllLines',
    'changeHRulerPosition',
    'changeVRulerPosition',
  ],
};
</script>
