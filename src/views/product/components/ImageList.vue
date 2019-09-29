<template>
  <div class="image-wrapper">
    <img :src="data[activeIndex]" alt="">
    <div class="scroll-bar">
      <div class="to-prev" @click="toPrev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <ul class="imgs" :style="scrollLeft">
        <li :class="{'active': activeIndex === index}" class="imgs-item" v-for="(item, index) in data" @click="changeIndex(index)" :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
      <div class="to-next" @click="toNext">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imageList',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      activeIndex: 0,
      scrollIndex: 0
    }
  },
  computed: {
    scrollLeft() {
      return {
        transform: `translateX(-${320 * this.scrollIndex}px)`,
        transition: 'all .2s ease-in'
      }
    }
  },
  methods: {
    changeIndex (index) {
      this.activeIndex = index
    },
    toPrev() {
      if (this.scrollIndex !== 0) {
        this.scrollIndex--
      }
    },
    toNext() {
      if (this.scrollIndex < Math.ceil(this.data.length / 4) - 1) {
        this.scrollIndex++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  &-wrapper {
    font-size: 0;
    text-align: center;

    img {
      height: 300px;
      max-width: 100%;
    }

    .scroll-bar {
      margin: 20px -10px 0 -10px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      width: 320px;
      height: 60px;
    }

    .imgs {
      box-sizing: border-box;
      white-space: nowrap;
      &-item {
        display: inline-block;
        height: 60px;
        width: 60px;
        margin: 0 10px;
        overflow: hidden;
        border: 1px solid #efefef;
        cursor: pointer;

        &.active {
          border-color: #bdbdbd;
        }

        img {
          width: 60px;
          height: 60px;
          margin: 0;
        }
      }
    }
    
    .to-prev {
      position: absolute;
      top: 50%;
      left: 10px;
      color: white;
      width: 28px;
      height: 28px;
      font-size: 20px;
      text-align: center;
      line-height: 28px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
      transform: translateY(-50%);
      background-color: rgba(255, 24, 29, 1);
    }

    .to-next {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 28px;
      height: 28px;
      font-size: 20px;
      text-align: center;
      line-height: 28px;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
      transform: translateY(-50%);
      background-color: rgba(255, 24, 29, 1);
    }
  }
}
</style>
