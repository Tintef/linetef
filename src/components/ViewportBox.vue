<template>
  <div
    class="linetef__viewport-box"
    :style="getStyles"
  >
    <div :style="getTextStyles">
      {{width}} x {{height}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'viewport-box',
  props: ['color', 'width', 'height'],
  computed: {
    getStyles() {
      const { color, height, width } = this;

      const isMobile = height > width;
      const divFactor = isMobile ? 5 : 10;

      return {
        borderColor: color,
        color,
        height: `${height / divFactor}px`,
        left: `${width - width / divFactor - 40}px`,
        top: `${height - height / divFactor - 40}px`,
        width: `${width / divFactor}px`,
      };
    },
    getTextStyles() {
      const { height, width } = this;

      return {
        textAlign: 'center',
        transform: `rotate(-${(Math.atan(height / width) * 180) / Math.PI}deg)`,
        width: `${Math.sqrt(height ** 2 + width ** 2)}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.linetef__viewport-box {
  position: fixed;
  border: 2px solid;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
