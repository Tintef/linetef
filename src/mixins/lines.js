const linesMixin = {
  data() {
    return {
      editingLine: {
        index: null,
        type: null,
      },
      hLines: [],
      vLines: [],
      bodyOverflow: null,
    };
  },
  created() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.message === 'linetef:delete:all:lines') {
        this.deleteAllLines();
      }
    });
  },
  methods: {
    addMouseListeners() {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup',   this.onMouseUp);
    },
    removeMouseListeners() {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup',   this.onMouseUp);
    },
    addTouchListeners() {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend',  this.onTouchEnd);

      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    },
    removeTouchListeners() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend',  this.onTouchEnd);

      document.body.style.overflow = this.bodyOverflow;
    },
    getY(ev) {
      return ev.clientY + window.scrollY;
    },
    getNativeCoords(ev) {
      const { touches } = ev;
      const nativeEv = touches[0];

      return { x: nativeEv.clientX, y: this.getY(nativeEv) };
    },

    // Fire up listeners + start line
    onMouseDown(ev, type = 'horizontal') {
      this.addMouseListeners();
      this.start({ x: ev.clientX, y: this.getY(ev) }, type);
    },
    onTouchStart(ev, type = 'horizontal') {
      try {
        this.addTouchListeners();
        this.start(this.getNativeCoords(ev), type);
      } catch(error) {
        // The event is not native
        // console.error('error: ', error);
      }
    },

    // Handle movement
    onMouseMove(ev) {
      this.trackMove({ x: ev.clientX, y: this.getY(ev) });
    },
    onTouchMove(ev) {
      this.trackMove(this.getNativeCoords(ev));
    },

    // Clear listeners and finish line creation/edition
    onMouseUp(ev) {
      this.removeMouseListeners();
      this.finish({ x: ev.clientX, y: this.getY(ev) });
    },
    onTouchEnd() {
      const { editingLine: { index, type } } = this;
      this.removeTouchListeners();

      const lines = this.getNewLines(type);
      this.finish({
        x: lines[index].x,
        y: lines[index].y,
      });
    },

    // Trigger edition mode
    moveLine(index, mode = 'desktop', type = 'horizontal') {
      if (!Number.isInteger(index)) return;

      this.editingLine = { index, type };
      if (mode === 'desktop') this.addMouseListeners();
      else this.addTouchListeners();
    },

    // Common code for both mouse/touch events
    start({ x, y}, type) {
      const newLines = this.getNewLines(type);
      newLines.push({ x, y, type });

      this.editingLine = { type, index: newLines.length - 1 };
      this.setLines(type, newLines);
    },
    trackMove({ x, y }) {
      const {
        editingLine: { index, type },
      } = this;

      const newLines = this.getNewLines(type);

      if (Number.isInteger(index)) {
        newLines[index] = { ...newLines[index], x, y };
      } else {
        const size = newLines.length;
        newLines[size] = { ...newLines[size], x, y };
      }

      this.setLines(type, newLines);
    },
    finish({ x, y } = {}) {
      const {
        editingLine: { index, type },
      } = this;

      if (Number.isInteger(index)) {
        const newLines = this.getNewLines(type);

        newLines[index] = {
          ...newLines[index],
          x: x || newLines[index].x,
          y: y || newLines[index].y,
        };

        if (!(x > 20 && y > 20))
          newLines.splice(index, 1);

        this.setLines(type, newLines);
      }

      this.editingLine = {
        index: null,
        type: null,
      };
    },
    deleteLine() {
      const {
        editingLine: { index, type },
      } = this;

      if (!Number.isInteger(index)) return;

      this.removeMouseListeners();
      this.removeTouchListeners();
      this.editingLine = {
        index: null,
        type: null,
      };
      const newLines = this.getNewLines(type);
      newLines.splice(index, 1);
      this.setLines(type, newLines);
    },
    deleteAllLines() {
      this.hLines = [];
      this.vLines = [];
      this.editingLine = {
        index: null,
        type: null,
      };

      this.removeMouseListeners();
      this.removeTouchListeners();
    },

    // Commonly used function
    getNewLines(type = 'horizontal') {
      if (type === 'horizontal') return [...this.hLines];

      return [...this.vLines];
    },
    setLines(type = 'horizontal', newLines = []) {
      if (type === 'horizontal') {
        return this.hLines = newLines;
      }

      return this.vLines = newLines;
    },
  },
};

export default linesMixin;
