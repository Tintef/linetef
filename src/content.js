import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import Ruler from './Ruler';

global.browser = require('webextension-polyfill');

const vueAppEl = document.createElement('div');
vueAppEl.setAttribute('id', 'vue-app');
document.body.appendChild(vueAppEl);

Vue.use(Vue2TouchEvents, {
  disableClick: true,
});

new Vue({
  el: '#vue-app',
  render(h) {
    return (
      h(Ruler)
    );
  },
});
