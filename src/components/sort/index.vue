<template>
  <div class="label" @click="change">
    <span>{{label}}</span>
    <div class="column">
      <i :class="{'active-up': isDesc}" class="up"></i>
      <i :class="{'active-down': isAsc}" class="down"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iSort',
  props: {
    label: String,
    name: String,
    value: Object
  },
  computed: {
    isDesc() {
      return (this.value.name === this.name) && (this.value.type === 'SORT_DESC')
    },
    isAsc() {
      return (this.value.name === this.name) && (this.value.type === 'SORT_ASC')
    }
  },
  methods: {
    change() {
      let obj = new Object(null)
      obj.name = this.name
      if (this.value.type === 'SORT_DESC') {
        obj.type = 'SORT_ASC'
      } else if (this.value.type === 'SORT_ASC') {
        obj.type = 'SORT_DESC'
      }
      this.$emit('input', obj)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  user-select: none;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
}

.up {
  width:0;
  height:0;
  margin-bottom: 4px;
  border-width: 6px 3px 6px 3px;
  border-style: solid;
  border-color: transparent transparent #d8d8d8;
  position: relative;
}

.down {
  width:0;
  height:0;
  border-width: 6px 3px 6px 3px;
  border-style: solid;
  border-color: #d8d8d8 transparent transparent;
  position: relative;
}

.active-up {
  border-color: transparent transparent #53C35D;
}

.active-down {
  border-color: #53C35D transparent transparent;
}
</style>
