export const modes = { px: 'px', percentage: '%' };

const configsMixin = {
  data() {
    return {
      color: '#56bdff',
      mode: modes.px,
      on: true,
      showDistances: true,
      showViewport: true,
      hRulerPosition: 'top',
      vRulerPosition: 'left',
    };
  },
  created() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.message === 'linetef:configs:changed') {
        this.getConfigs();
      }
    });

    this.getConfigs();
  },
  methods: {
    changeColor(color) {
      this.color = color.hex;
      chrome.storage.sync.set({ color: color.hex });
      this.sendMessage();
    },
    toggleOn() {
      chrome.storage.sync.set({ on: !this.on });
      this.on = !this.on;
      this.sendMessage();
    },
    toggleShowDistances() {
      chrome.storage.sync.set({ showDistances: !this.showDistances });
      this.showDistances = !this.showDistances;
      this.sendMessage();
    },
    toggleShowViewport() {
      chrome.storage.sync.set({ showViewport: !this.showViewport });
      this.showViewport = !this.showViewport;
      this.sendMessage();
    },
    changeMode(modeKey = null) {
      if (this.mode === modes[modeKey]) return;

      let newMode;
      // Force to this mode
      if (modeKey) {
        newMode = modes[modeKey];
      } else {
        newMode = this.mode === modes.px ? modes.percentage : modes.px;
      }

      chrome.storage.sync.set({ mode: newMode });
      this.mode = newMode;
      this.sendMessage();
    },
    changeHRulerPosition(hRulerPosition = 'top') {
      chrome.storage.sync.set({ hRulerPosition });
      this.hRulerPosition = hRulerPosition;
      this.sendMessage();
    },
    changeVRulerPosition(vRulerPosition = 'left') {
      chrome.storage.sync.set({ vRulerPosition });
      this.vRulerPosition = vRulerPosition;
      this.sendMessage();
    },
    resetConfigs() {
      this.color = '#56bdff';
      this.on = true;
      this.showDistances = true;
      this.showViewport = true;
      this.mode = modes.px;
      this.hRulerPosition = 'top';
      this.vRulerPosition = 'left';

      chrome.storage.sync.set({
        color: '#56bdff',
        on: true,
        showDistances: true,
        showViewport: true,
        mode: modes.px,
        hRulerPosition: 'top',
        vRulerPosition: 'left',
      });

      this.sendMessage();
    },
    sendMessage(message = 'linetef:configs:changed') {
      chrome.runtime.sendMessage({ message });
    },
    getConfigs() {
      chrome.storage.sync.get([
        'color',
        'mode',
        'on',
        'showDistances',
        'showViewport',
        'hRulerPosition',
        'vRulerPosition',
      ], ({
        color, mode, on, showDistances, showViewport, hRulerPosition, vRulerPosition,
      }) => {
        // First load
        if (
          color === undefined
          && on === undefined
          && showDistances === undefined
          && showViewport === undefined
          && mode === undefined
        ) {
          chrome.storage.sync.set({ color: this.color });
          chrome.storage.sync.set({ mode: this.mode });
          chrome.storage.sync.set({ on: this.on });
          chrome.storage.sync.set({ showDistances: this.showDistances });
          chrome.storage.sync.set({ showViewport: this.showViewport });
          chrome.storage.sync.set({ hRulerPosition: this.hRulerPosition });
          chrome.storage.sync.set({ vRulerPosition: this.vRulerPosition });
        } else {
          if (color !== this.color) this.color = color;
          if (mode !== this.mode) this.mode = mode;
          if (on !== this.on) this.on = on;
          if (showDistances !== this.showDistances) this.showDistances = showDistances;
          if (showViewport !== this.showViewport) this.showViewport = showViewport;
          if (hRulerPosition !== this.hRulerPosition) this.hRulerPosition = hRulerPosition;
          if (vRulerPosition !== this.vRulerPosition) this.vRulerPosition = vRulerPosition;
        }

        this.loading = false;
      });
    },
  },
};

export default configsMixin;
