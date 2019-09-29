<template>
  <span :class="{'disabled': disable}" class="checkbox_wrapper" @click="check">
    <i :class="[value? 'checkbox-on': 'checkbox-off']" class="checkbox" :style="computedSize"></i>
    {{label}}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    size: {
      type: Number,
      default: 18
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    check() {
      if (!this.disable) {
        this.$emit('input', !this.value)
      }
    }
  },
  computed: {
    computedSize() {
      const wh = this.size + 'px'
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
  &_wrapper {
    overflow: hidden;
    cursor: pointer;
    line-height: 1;
  }
}

.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
