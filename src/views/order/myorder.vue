<template>
  <main class="container">
    <div class="header">
      <order-guide />
      <div class="tabs clearfix">
        <div class="tab" :class="{'theme_font--color': filter === 'all'}">
          <a href="javascript:void(0)" @click="setFilter('all')">全部订单</a>
        </div>
        <div class="tab" :class="{'theme_font--color': filter === 0}">
          <a href="javascript:void(0)" @click="setFilter(0)">待付款</a>
        </div>
        <div class="tab" :class="{'theme_font--color': filter === 1}">
          <a href="javascript:void(0)" @click="setFilter(1)">待发货</a>
        </div>
        <div class="tab" :class="{'theme_font--color': filter === 2}">
          <a href="javascript:void(0)" @click="setFilter(2)">待收货</a>
        </div>
      </div>
    </div>

    <div class="list">
      <table style="width: 100%;">
        <thead>
          <tr class="list-header">
            <th width="160">产品图片</th>
            <th width="190">产品名称</th>
            <th width="175">型号规格</th>
            <th width="115">单价</th>
            <th width="100">数量</th>
            <th width="120">实付</th>
            <th width="140">支付方式</th>
            <th width="100">交易状态</th>
            <th width="100">操作</th>
          </tr>
        </thead>
      </table>

      <template v-for="(item, index) in list">
        <div :key="index" class="item-date">
          <span class="mr40">{{ formatTime(item.create_time) }}</span>
          <span>订单号：{{ item.MainOrders[0].order_no }}</span>
        </div>
        <div :key="index + 10000" class="position-relative">
          <table style="width: 1100px;">
            <tbody>
              <tr v-for="(goods, idx) in item.MainOrders[0].orderSkus" :key="idx" class="list-row">
                <td width="160">
                  <img :src="goods.img_url" class="avatar" alt="">
                </td>
                <td width="190">{{ goods.spu_name }}</td>
                <td width="175">{{ goods.value_names }}</td>
                <td width="115">{{ goods.sku_price }}</td>
                <td width="100">{{ goods.num }}</td>
                <td widtd="120" class="theme_font--color">{{ goods.sub_total }}</td>
                <td width="140">
                  <span v-if="goods.pay_channel == 8">微信支付</span>
                  <span v-if="goods.pay_channel == 7">支付宝支付</span>
                  <span v-if="goods.pay_channel == 10">余额支付</span>
                  <span v-if="goods.pay_channel == 11">线下支付</span>
                </td>
                <td width="100">{{ item.status_name }}</td>
              </tr>
            </tbody>
          </table>
          <div class="operate">
            <template v-if="item.status == 0">
              <!-- 待付款 -->
              <a class="danger table-btn" href="javascript: void(0);" @click="pay(item.MainOrders[0].order_no)">立即支付</a>
              <a class="danger table-btn" href="javascript: void(0);" @click="toCheckDetail(item.main_order_id, item.order_id)">订单详情</a>
            </template>
            <template v-else-if="item.status == 1">
              <!-- 待发货 -->
              <a class="danger table-btn" href="javascript: void(0);" @click="toCheckDetail(item.main_order_id, item.order_id)">订单详情</a>
            </template>
            <template v-else-if="item.status == 2">
              <a class="danger table-btn" href="javascript: void(0);" @click="toCheckDetail(item.main_order_id, item.order_id)">订单详情</a>
              <a class="danger table-btn" href="javascript: void(0);">查看物流</a>
              <a class="danger table-btn" href="javascript: void(0);" @click="toCheckDetail(item.main_order_id, item.order_id)">确认收货</a>
            </template>
            <template v-else-if="item.status == 8">
              <!-- 订单关闭 -->
              <a class="danger table-btn" href="javascript: void(0);" @click="deleteItem(item.main_order_id)">删除订单</a>
              <a class="danger table-btn" href="javascript: void(0);" @click="toCheckDetail(item.main_order_id, item.order_id)">订单详情</a>
            </template>
            <template v-else-if="item.status == 9">
              <!-- 交易成功 -->
              <a class="danger table-btn" href="javascript: void(0);" @click="checkExpress(item.MainOrders[0].order_no)">查看物流</a>
              <a class="danger table-btn" href="javascript: void(0);" @click="confirm(item.MainOrders[0].order_no)">确认收货</a>
            </template>
          </div>
        </div>
      </template>
    </div>
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="10"
      :total="total_pages * 1"
      @current-change="change"
    />
  </main>
</template>

<script>
import OrderGuide from './components/OrderGuide.vue'
import { requestOrderList, removeOrder, confirmOrder } from '@/api/product.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Myorder',
  components: {
    OrderGuide
  },
  data() {
    return {
      filter: 'all',
      list: [],
      start_page: 0, // 分页
      total_pages: 0
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.doGetOrderList()
  },
  methods: {
    setFilter(filter) {
      this.filter = filter
      this.doGetOrderList()
    },
    // 检查订单详情
    toCheckDetail(id, order_id) {
      this.$router.push({ name: 'orderinfo', params: { id }, query: { order_id }})
    },
    doGetOrderList() {
      const query = {
        token: this.token,
        start_page: this.start_page,
        pages: 10
      }
      if (this.filter !== 'all') {
        query.status = this.filter
      }
      requestOrderList(query).then(res => {
        if (res.errcode == 0) {
          this.total_pages = res.data.total_pages
          this.list = res.data.list || []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    formatTime(time) {
      const date = new Date(time)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    // 删除订单
    deleteItem(id) {
      removeOrder({
        token: this.token,
        main_order_id: id
      }).then(res => {
        if (res.errcode == 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.doGetOrderList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 立即支付
    pay(order_no) {
      this.$router.push({ name: 'pay', query: { id: order_no }})
    },
    // 确认收货
    confirm(order_no) {
      confirmOrder({
        token: this.token,
        order_id: order_no
      }).then(res => {
        if (res.errcode == 0) {
          this.doGetOrderList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看物流
    checkExpress(order_no) {
      this.$router.push({ name: 'express', query: { order_no }})
    },
    change(page) {
      this.start_page = page - 1
      this.doGetOrderList()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 30px auto;
  .header {
    width: 1200px;
    height: 176px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    border-radius: 4px;
  }

  .tabs {
    text-align: center;
    font-size: 0;
    color: rgba(136, 136, 136, 1);
    .tab {
      width: 245px;
      font-size: 18px;
      line-height: 85px;
      display: inline-block;
      transition: all .2s ease-in-out;
    }
  }

  .list {
    width: 1200px;
    text-align: center;
    color: rgba(74, 74, 74, 1);
    background: rgba(255,255,255,1);
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    border-radius: 4px;
    margin-top: 30px;
    margin-bottom: 30px;
    &-header {
      height: 64px;
      font-size: 16px;
      font-weight: 600;
      color: rgba(74, 74, 74, 1);
    }

    &-row {
      height: 100px;
      font-size: 14px;
      color: rgba(74, 74, 74, 1);
      .avatar {
        width: 62px;
        height: 62px;
      }
    }

    .item-date {
      height: 44px;
      font-size: 14px;
      text-align: center;
      line-height: 44px;
      background-color: rgba(255, 24, 29, .1);
    }

    .mr40 {
      margin-right: 40px;
    }

    .table-btn {
      width: 88px;
      height: 25px;
      font-size: 14px;
      line-height: 25px;
      border-radius: 4px;
      display: inline-block;
      transition: all .2s ease-in-out;

      &:hover {
        opacity: .9;
        color: white;
      }

      &:active, &:visited, &:link {
        color: white;
      }
    }

    .table-btn + .table-btn {
      margin-top: 12px;
    }

    .operate {
      width: 100px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
