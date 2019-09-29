<template>
  <div class="booth">
    <img class="booth-img" :src="currentImage">
    <ul class="booth-thumb">
      <template v-for="(i, index) in data">
        <li :key="index" :class="{'selected': currentIndex === index}" class="booth-thumb-li" @mouseenter="thumb(index)">
          <a href="javascript:void(0);">
            <img class="booth-thumb-img" :src="i" />
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    currentImage() {
      return this.data[this.currentIndex]
    }
  },
  methods: {
    thumb(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.booth {
  width: 470px;
  &-img {
    width: 100%;
    height: 398px;
  }
  &-thumb {
    margin-top: 16px;
    margin-left: -16px;
    overflow: hidden;
    &-li {
      display: inline-block;
      margin-left: 16px;
    }
    &-img {
      position: relative;
      width: 105px;
      height: 102px;
    }
    a {
      float: left;
      position: relative;
      overflow: hidden;
      width: 105px;
      height: 102px;
    }
    .selected a {
      border: 2px solid #53C35D;
    }
    .selected &-img {
      left: -2px;
      top: -2px;
    }
  }
}
</style>
