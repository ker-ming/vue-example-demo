<template>
  <span class="setcount">
    <i :class="[value === this.min? 'btn_reduce--off': 'btn_reduce--on']" class="btn" @click="reduce"></i>
    <input type="number" class="counter" :min="min" :max="max" :value="value" @blur="input" />
    <i :class="[value === this.max? 'btn_add--off': 'btn_add--on']" class="btn" @click="add"></i>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    }
  },
  methods: {
    input(e) {
      let value = e.target.value * 1
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.trigger(value)
    },
    trigger(val) {
      this.$emit('input', val)
    },
    add() {
      let val = this.value
      if (++val <= this.max) {
        this.trigger(val)
      }
    },
    reduce() {
      let val = this.value
      if (--val >= this.min) {
        this.trigger(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
 
input[type="number"] {
  -moz-appearance: textfield;
}

.setcount {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  width: 15px;
  height: 15px;
}

.counter {
  width: 55px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: none;
  margin: 0 10px;
  outline: none;
  background: rgba(246,246,247,1);
  border-radius: 3px;
}

.btn_add--on {
  background: url(../../assets/img/add-active.png) no-repeat 0 0/15px 15px;
}

.btn_add--off {
  background: url(../../assets/img/add-disable.png) no-repeat 0 0/15px 15px;
}

.btn_reduce--on {
  background: url(../../assets/img/reduce-active.png) no-repeat 0 0/15px 15px;
}

.btn_reduce--off {
  background: url(../../assets/img/reduce-disable.png) no-repeat 0 0/15px 15px;
}
</style>
