<template>
  <section class="recommend">
    <div class="recommend-title">
      <span class="strong color33">{{title}}</span>
    </div>
    <div class="recommend-list">
      <template v-for="item in goods">
        <router-link :key="item.item_id" :to="{name: 'GoodInfo', query: {id: item.item_id}}" class="fl goods">
          <img :src="item.img_url" alt="" class="goods-image">
          <div class="goods-title">{{item.title}}</div>
          <div>
            <span class="price">¥{{item.price}}</span>
            <span class="prime">¥{{item.old_price}}</span>
          </div>
        </router-link>
      </template>
    </div>
  </section>
</template>

<script>
import { searchGoods } from '@/api/index'
export default {
  props: {
    type: String,
    data: Array,
    numbers: Number,
    title: String
  },
  data() {
    return {
      goods: []
    }
  },
  beforeMount() {
    let type = this.type
    if (type == 6) { // 热门
      this.searchGoods({
        start_page: 0,
        pages: this.numbers,
        is_hot: 1
      })
    } else if (type == 7) { // 新品
      this.searchGoods({
        start_page: 0,
        pages:　this.numbers,
        is_new: 1
      })
    } else if (type == 10) { // 自定义
      this.searchGoods({
        item_ids: this.data
      })
    }
  },
  methods: {
    searchGoods(data) {
      searchGoods(data).then(res => {
        this.goods = res.data.list || []
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  margin-top: 38px;
  overflow: hidden;
  background-color: white;
  padding: 10px 20px;
  &-title {
    font-size: 13px;
    height: 45px;
    line-height: 45px;
  }
  &-list {
    margin-left: -40px;
  }
}

.goods {
  width: 260px;
  margin-left: 40px;
  margin-bottom: 40px;
  &-image {
    width: 100%;
    height: 172px;
  }
  &-title {
    font-size: 12px;
    width: 114px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    margin-bottom: 4px;
  }
}

.price {
  color: #E51F1F;
  font-size: 15px;
}

.prime {
  color: #999999;
  font-size: 13px;
  text-decoration: line-through;
}
</style>
