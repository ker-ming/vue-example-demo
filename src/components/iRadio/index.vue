<template>
  <span class="checkbox-wrapper" @click="check">
    <i :class="[value === label? 'checkbox-on': 'checkbox-off']" class="checkbox" :style="computedSize"></i>
    <slot>
      <span>{{text}}</span>
    </slot>
  </span>
</template>

<script>
export default {
  props: {
    value: {},
    label: {},
    text: {},
    size: {
      type: Number,
      default: 18
    }
  },
  methods: {
    check() {
      this.$emit('input', this.label)
    }
  },
  computed: {
    computedSize() {
      let wh = this.size + 'px'
      return {
        width: wh,
        height: wh,
        backgroundSize: wh + ' ' + wh
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-on {
  background: url(../../assets/img/checkbox-on.png) no-repeat 0 0;
}

.checkbox-off {
  background: url(../../assets/img/checkbox-off.png) no-repeat 0 0;
}

.checkbox {
  vertical-align: middle;
  display: inline-block;
  margin-right: 12px;
  &-wrapper {
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
