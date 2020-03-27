import Vue from 'vue';
import VTooltip from 'v-tooltip';

import App from './App';


global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

Vue.use(VTooltip);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
});
