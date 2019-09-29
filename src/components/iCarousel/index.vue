<template>
  <div>
    <el-carousel ref="carousel" @change="change" indicator-position="none" :height="height">
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img class="carousel-image" @click="show(item.show_type, item.param)" :src="item.img_url" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="ad-list">
      <div class="ad-ul" :style="{marginLeft}">
        <template v-for="(item, index) in images">
          <a :key="item.id + index" href="javascript: void(0);" :class="{'selected': currentIndex === index}">
            <img class="ad-image" :src="item.img_url" alt="">
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestBanner } from '@/api/index'
export default {
  props: {
    height: String
  },
  data() {
    return {
      images: [],
      currentIndex: 0
    }
  },
  computed: {
    marginLeft() {
      let left = this.currentIndex - 2 > 0 ? (this.currentIndex - 2) * 238 + 21: 21
      return `-${left}px`
    }
  },
  beforeMount() {
    this.requestBanner()
  },
  methods: {
    requestBanner() {
      requestBanner({
        seat_id: 1
      }).then(res => {
        this.images = res.data.list || []
        while (this.images.length < 3) {
          this.images.push(this.images[0])
        }
      }).catch(error => {
        console.log(error)
      })
    },
    show(type, param) {
      switch (type * 1) {
        case 1:
          break
        case 2:
          location.href = param
          break
        case 3:
          break
        case 5:
          this.$router.push({path: '/goodinfo', query: {id: param}})
      }
    },
    change(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>

.ad {
  &-list {
    width: 690px;
    margin-top: 17px;
    display: flex;
    margin-right: 0;
    font-size: 0px;
    overflow: hidden;
    position: relative;
    a {
      float: left;
      position: relative;
      overflow: hidden;
      width: 216px;
      height: 217px;
      margin-left: 21px;
      &.selected {
        border: 2px solid #53C35D;
      }
    }
  }
  &-ul {
    transition: all .2s ease-in;
    white-space: nowrap;
    min-width: 9999px;
  }
  &-image {
    width: 216px;
    height: 217px;
    object-fit: cover;
    .selected & {
      left: -2px;
      top: -2px;
      position: absolute;
    }
  }
}

.carousel {
  &-image {
    width: 100%;
    height: 100%;
    user-select: none;
    object-fit: cover;
  }
}
</style>
