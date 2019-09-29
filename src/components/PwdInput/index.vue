<template>
  <div class="input-wrapper flex-row" @click="focusInput">
    <input type="text" :value="value" ref="pwdInput" @input="input" @blur="blur" class="input-area" maxlength="6">
    <template v-for="(item, index) in 6">
      <template v-if="active === index">
        <span :key="index" class="input-item active"></span>
      </template>
      <template v-else-if="index < value.length">
        <span :key="index" class="input-item full"></span>
      </template>
      <template v-else>
        <span :key="index" class="input-item"></span>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      focus: false,
      active: -1
    }
  },
  methods: {
    focusInput() {
      this.$refs.pwdInput.focus()
      if (this.value.length === 0) {
        this.active = 0
      } else {
        this.active = this.value.length
      }
    },
    input(e) {
      this.active = e.target.value.length
      this.$emit('input', e.target.value)
    },
    blur() {
      this.active = -1
    }
  }
}
</script>

<style lang="scss" scoped>

.input {
  &-wrapper {
    width: 360px;
    height: 60px;
    border-radius: 3px;
    border: 1px solid rgba(151,151,151,1);
  }
  &-item {
    flex: 1;
    height: 34px;
    text-align: center;
    display: inline-block;
    & + & {
      border-left: 1px solid #979797;
    }
  }
  &-area {
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
}

@keyframes pointer {
  0% {
    background: transparent;
  }
  100% {
    background: #333333;
  }
}

.active {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 30px;
    animation: pointer 1s infinite;
  }
}

.full {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #333333;
  }
}
</style>
