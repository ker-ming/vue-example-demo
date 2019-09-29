<template>
  <div>
    <div class="pic-list">
      <template v-for="(url, index) in urls">
        <a :key="index" href="javascript: void(0);" :class="{'thumb-img': true, 'current': index === current}" @click="setCurrent(index)">
          <img :src="url" alt="" width="56" height="56">
        </a>
      </template>
    </div>
    <div class="clear">
      <div v-if="url" class="pic-view">
        <img :src="url" class="pic-view-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urls: {
      type: Array
    }
  },
  data() {
    return {
      index: 0,
      current: -1,
      url: this.urls[this.current] || null
    }
  },
  methods: {
    setCurrent(index = 0) {
      this.current = index
      this.url = this.urls[index]
    }
  }
}
</script>

<style lang="scss" scoped>
.pic {
  &-list {
    padding-bottom: 15px;
  }
  &-view {
    padding: 0;
    margin: 0;
    width: auto;
    height: auto;
    position: relative;
    border: 1px solid #e3e3e3;
    margin: 7px 0 11px;
    float: left;
    &-img {
      border: none;
      vertical-align: middle;
    }
  }
}

.thumb-img {
  display: inline-block;
  position: relative;
  color: #666;
  text-decoration: none;
  padding: 1px;
  margin-right: 6px;
  &>img {
    vertical-align: middle;
    object-fit: contain;
    border: 1px solid #e2e2e2;
  }
  &.current img {
    border: 2px solid #53C35D;
    padding: 0;
  }
}
</style>
