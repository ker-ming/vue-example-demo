<template>
    <div class="recommend">
        <nav class="font-13 color55 recommend-title">推荐商品</nav>
        <div class="clear">
            <template v-for="(item, index) in likes">
            <router-link :key="index" :to="{ path: '/goodinfo', query: {id: item.item_id} }" class="fl recommend-good" replace>
              <img class="recommend-good--img" :src="item.img_url" alt="">
              <div class="recommend-good--name">{{item.title | format}}</div>
            </router-link>
            </template>
        </div>
    </div>
</template>

<script>
import { doYouLike } from '@/api/index'
export default {
  data() {
    return {
      likes: []
    }
  },
  beforeMount() {
    this.doYouLike()
  },
  filters: {
    format (value) {
      if (typeof value === 'string' && value.length > 14) {
        return value.substring(0, 13) + '...'
      }
      return value
    }
  },
  methods: {
    doYouLike() {
      doYouLike({
        is_tob: 1
      }).then(res => {
        this.likes = res.data.slice(0, 4)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>

.recommend {
  width: 217px;
  margin: 30px 0;
  border: 1px solid #E8E8E8;
  &-title {
    height: 42px;
    line-height: 20px;
    padding: 11px 6px;
    color: #555555;
    font-size: 13px;
  }
  &-good {
    width: 93px;
    height: 133px;
    margin-left: 10px;
    margin-bottom: 12px;
    &--img {
      width: 100%;
      height: 93px;
    }
    &--name {
      font-size: 10px;
      font-weight: 500;
      color: rgba(85,85,85,1);
      line-height: 15px;
      margin-top: 10px;
    }
  }
}
</style>
