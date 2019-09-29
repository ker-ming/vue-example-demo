<template>
  <div class="six-password">
    <input type="password" :value="value" @focus="focus" @blur="blur" @input="input" maxlength="6" minlength="6">
    <div class="password-box">
      <i v-for="i in 6" :key="i" :class="{'tabindex': focusIndex === i}">
        <b v-show="i <= value.length"></b>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      focusIndex: 0
    }
  },
  methods: {
    focus() {
      if (this.value.length >= 0) {
        this.focusIndex = this.value.length + 1
      }
    },

    blur() {
      this.focusIndex = 0
    },

    input(e) {
      const value = e.target.value
      this.$emit('input', value)
      if (value.length >= 0) {
        this.focusIndex = value.length + 1
      }
    }
  }
}
</script>

<style lang="scss">
.six-password {
  width: 345px;
  height: 45px;
  position: relative;
  margin: 64px auto 230px auto;
  border-radius: 3px;
  border: 1px solid rgba(209, 209, 209, 1);
  .password-box {
    overflow: hidden;
    i {
      float: left;
      width: 57px;
      height: 45px;
      position: relative;
      border-left: 1px solid rgba(209, 209, 209, 1);
      &:first-child {
        border-color: transparent;
      }
    }

    b {
      display: block;
      margin: 15px auto 0 auto;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #1a1a1a;
    }
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 345px;
    height: 26px;
    color: #fff;
    font-size: 12px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    user-select: initial;
    outline: 'none';
    z-index: 999;
    opacity: 0;
  }

  @keyframes tabindex {
    form {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .tabindex:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 28px;
    width: 1px;
    height: 25px;
    background-color: #1a1a1a;
    animation: tabindex 1s ease-in-out infinite;
  }
}
</style>
