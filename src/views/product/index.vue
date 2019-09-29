<template>
  <main class="partner-container clearfix">
    <aside class="fl sidebar">
      <nav class="sidebar-header">
        <table class="guide" border="0">
          <tbody>
            <tr class="row">
              <td width="149">
                <router-link to="/cart" class="mycart">
                  <i></i>
                  <span class="font-16">我的购物车</span>
                </router-link>
              </td>
              <td>
                <div class="sep"></div>
              </td>
              <td>
                <router-link to="/myorder" class="font-16">我的订单</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </nav>
      <dl class="external-link">
        <dt class="external-header">
          <i class="collapse"></i>
          <span>产品分类</span>
        </dt>
        <dd v-for="(item, index) in category" :key="index" class="position-relative category-item">
          <div class="link-item" :class="{'active-link': item.mcid === select_category}" @click="checked(item.mcid)">
            {{item.name}}
          </div>
          <ul v-if="item.second_category" class="sublist">
            <li
              v-for="(m, idx) in item.second_category"
              :key="idx"
              @click="checkSecond(item.mcid, m.mcid)"
              :class="{'theme_font--color': select_second_category === m.mcid}">
              {{m.name}}
            </li>
          </ul>
        </dd>
      </dl>
    </aside>

    <div class="goods fl">
      <div class="clearfix">
        <template v-for="i in goods">
          <router-link :key="i.item_id" class="fl" :to="{ name: 'productDetail', params: {id: i.item_id}, query: {key: 4}}" target="_blank">
            <div class="good">
              <img class="good-image" :src="i.img_url" alt="">
              <div class="good-title">{{i.title}}</div>
              <div class="good-price">¥{{i.price}}</div>
            </div>
          </router-link>
        </template>
      </div>
      <el-pagination
        layout="prev, pager, next"
        background
        :page-size="9"
        @current-change="change"
        :total="total_pages * 1">
      </el-pagination>
    </div>
  </main>
</template>

<script>
import { requestGoods, requestCategory } from '@/api/product.js'
export default {
  name: 'products',
  data () {
    return {
      start_page: 0,
      goods: [],
      category: [],
      select_category: null,
      select_second_category: null,
      total_pages: 0
    }
  },
  computed: {
  },
  created() {
    this.doGetCategory()
    this.doGetGoods()
  },
  methods: {
    doGetCategory() {
      requestCategory().then(res => {
        if (res.errcode == 0) {
          this.category = res.data || []
        }
      })
    },
    checked(id) {
      this.select_category = id
      for (let i = 0, len = this.category.length; i < len; i++) {
        if (this.category[i].mcid === this.select_category && this.category[i].second_category.length > 0) {
          this.select_second_category = this.category[i].second_category[0].mcid
          break
        }
      }
      this.doGetGoods()
    },
    checkSecond(id, sid) {
      this.select_category = id
      this.select_second_category = sid
      this.doGetGoods()
    },
    // 搜索商品
    doGetGoods() {
      requestGoods({
        start_page: this.start_page,
        pages: 9,
        mcid: this.select_second_category || this.select_category
      }).then(res => {
        if (res.errcode == 0) {
          this.goods = res.data.list || []
          this.total_pages = res.data.total_pages
        }
      })
    },
    change(page) {
      this.start_page = page - 1
      this.doGetGoods()
    }
  }
}
</script>

<style lang="scss" scoped>
  .partner-container {
    width: 1200px;
    margin: 30px auto;
    overflow: hidden;

    .sidebar {
      width: 300px;
      &-header {
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
        background-color: white;
        margin-bottom: 20px;
      }
    }

    .guide {
      width: 100%;
      border-collapse: collapse;
      .row {
        height: 90px;
      }

      .sep {
        width: 1px;
        height: 40px;
        background-color: #C6CFD9;
      }
    }

    .external-link {
      height: 672px;
      font-size: 16px;
      color: #4A4A4A;
      text-align: center;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
      position: relative;
      z-index: 1000;
      .link-item {
        width: 100%;
        line-height: 56px;
        display: inline-block;
      }
      .category-item {
        z-index: 1000;
        cursor: pointer;
        &:hover {
          .sublist {
            width: 164px;
            padding: 10px;
          }
        }
      }
      .sublist {
        position: absolute;
        left: 100%;
        top: 0;
        z-index: 999;
        width: 0;
        overflow: hidden;
        font-size: 16px;
        box-sizing: border-box;
        background-color: rgba(250, 250, 250, 1);
        li {
          height: 42px;
          line-height: 42px;
          cursor: pointer;
        }
      }
    }

    .external-header {
      height: 56px;
      font-size: 0;
      line-height: 56px;
      text-align: center;
      .collapse {
        width: 15px;
        height: 15px;
        display: inline-block;
        vertical-align: middle;
        background: url(../../assets/img/collapse.png) no-repeat center;
        background-size: 15px 15px;
        margin-right: 12px;
      }
      span {
        font-size: 16px;
        vertical-align: middle;
      }
    }

    .goods {
      width: 900px;
      overflow: hidden;
      margin-left: 30px;
      margin-right: -30px;
    }

    .good {
      width: 270px;
      height: 305px;
      background-color: white;
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
      border-radius: 4px;
      text-align: center;
      margin-right: 30px;
      margin-bottom: 30px;
      transition: all .2s ease-in-out;
      &:hover {
        box-shadow: 0 5px 20px 5px rgba(0, 0, 0, .06);
      }

      &-image {
        width:144px;
        height:144px;
        margin: 28px 0;
      }

      &-title {
        font-size: 16px;
        color: #4A4A4A;
        padding: 0 15px;
        line-height: 22px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &-price {
        font-size: 24px;
        color: #FF181D;
        line-height: 32px;
        margin-top: 20px;
      }
    }

    .mycart {
      font-size: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        width: 21px;
        height: 20px;
        margin-right: 12px;
        display: inline-block;
        background: url(../../assets/img/cart.png) no-repeat center;
        background-size: 21px 20px;
      }

      .font-16 {
        font-size: 16px;
      }
    }

    .active-link {
      background-color: rgba(74, 74, 74, .3);
    }
  }
</style>
