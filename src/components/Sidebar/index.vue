<template>
  <aside class="side-bar">
    <ul class="category-nav">
      <template v-for="(c, index) in category">
        <li :key="c.name" @mouseenter="over(index)" @mouseleave="out">
          <router-link class="nav-li" :to="{ name: 'search', query: { pid: c.mcid }}">
            <span>{{c.name}}</span>
            <span class="el-icon-arrow-right"></span>
          </router-link>
        </li>
      </template>
    </ul>
    <transition name="side">
      <div v-if="activeIndex >= 0 && second.length > 0" class="category-nav--detail" @mouseenter="clearTimeout" @mouseleave="out">
        <template v-for="item in second">
          <router-link :key="item.mcid" class="fl category-i" :to="{ name: 'search', query: { mcid: item.mcid, pid: item.pid } }">
            <img :src="item.img_url" class="category-i-img">
            <div class="category-i-title">{{item.name}}</div>
          </router-link>
        </template>
      </div>
    </transition>
  </aside>
</template>

<script>
import { requestCategory } from '@/api/index'
export default {
  data() {
    return {
      category: [],
      activeIndex: -1,
      timeout: null
    }
  },
  computed: {
    second() {
      return this.category[this.activeIndex].second_category
    }
  },
  beforeMount() {
    this.requestCategory()
  },
  methods: {
    over(index) {
      this.clearTimeout()
      this.activeIndex = index
    },
    out() {
      this.timeout = setTimeout(() => {
        this.activeIndex = -1
      }, 400)
    },
    clearTimeout() {
      clearTimeout(this.timeout)
    },
    requestCategory() {
      requestCategory().then(res => {
        this.category = res.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  width: 190px;
  height: 580px;
  float: left;
  z-index: 2000;
  color: #666666;
  position: relative;
  box-sizing: border-box;
  background: rgba(255,255,255,1);
  border-radius: 3px;
  border: 1px solid rgba(83,195,93,1);
}

.category-nav {
  list-style: none;
  font-size: 12px;
  margin: 0;
  padding: 12px 0;
  &--detail {
    width: 692px;
    overflow: hidden;
    padding: 20px 12px;
    background-color: white;
    position: absolute;
    left: 200px;
    top: 56px;
  }
}

.side {
  &--enter-active, &-leave-active {
    transition: all .5s;
  }
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }
}

.nav-li {
  position: relative;
  box-sizing: border-box;
  padding: 0 16px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category {
  &-i {
    width: 217px;
    height: 232px;
    margin-bottom: 20px;
    &-img {
      width: 100%;
      height: 200px;
      margin-bottom: 12px;
    }
    &-title {
      font-size: 13px;
      color: #333333;
      text-align: center;
      font-weight: 500;
      line-height: 20px;
    }
    & + & {
      margin-left: 8px;
    }
  }
}
</style>
