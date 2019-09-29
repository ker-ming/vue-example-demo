<template>
  <main class="order-info">
    <div class="panel-wrapper">
      <order-guide />
      <div class="address-info">
        <table class="time-table">
          <tr v-if="to_name">
            <td>姓名：{{ to_name }}</td>
            <td>所在地区：{{ to_address.split(' ')[0] }}</td>
          </tr>
          <tr v-if="to_name">
            <td>电话：{{ to_tel }}</td>
            <td>详细地址：{{ to_address.split(' ')[1] }}</td>
          </tr>
          <tr v-if="!to_name">
            <p>保存在公司总部仓库（可以在我的个人中心——我的库存查看及操作）</p>
          </tr>
        </table>
        <span class="status font-0">
          <span class="font-14 theme_font--color status-label">{{ status_name }}</span>
          <i v-if="status != 9" class="danger warn" />
          <i v-else class="okey complete" />
        </span>
      </div>
    </div>

    <div v-if="mainOrders.length > 0" class="order-goods panel-wrapper">
      <div class="item-date">
        <span class="mr40">{{ formatTime(mainOrders[0].create_time) }}</span>
        <span>订单号：{{ mainOrders[0].order_no }}</span>
      </div>
      <table>
        <thead>
          <tr class="list-header">
            <th width="160">产品图片</th>
            <th width="240">产品名称</th>
            <th width="250">型号规格</th>
            <th width="150">单价</th>
            <th width="100">数量</th>
            <th width="150">折扣优惠</th>
            <th width="150">小计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in mainOrders[0].orderSkus" :key="item.id" class="list-item">
            <td width="160">
              <img class="good-image" :src="item.img_url" alt="">
            </td>
            <td width="240">{{ item.spu_name }}</td>
            <td width="250">{{ item.value_names }}</td>
            <td width="150">{{ item.sku_price }}</td>
            <td width="100">{{ item.num }}</td>
            <td width="150" />
            <td width="150">{{ item.sub_total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 线下支付(原型：待发货，待平台确认) -->
    <template v-if="pay_channel == 11 && (status == 1 || status == 11)">
      <div class="panel-wrapper">
        <div class="remark">
          <h4 class="title">卖家留言</h4>
          <span>{{ mainOrders[0].remark }}</span>
        </div>
        <div class="purchase-time">下单时间：{{ mainOrders[0].create_time }}</div>
      </div>

      <div class="panel-wrapper mt30 account-message">
        <h4 class="title">请您通过网银转账，或者自行到银行进行汇款，汇款账号如下：</h4>
        <table class="time-table">
          <tr>
            <td>开户名称：{{ eubiq_pay_company }}</td>
            <td>银行账号：{{ eubiq_pay_account }}</td>
          </tr>
          <tr>
            <td>开户银行：{{ eubiq_pay_bank }}</td>
            <td>开户支行：{{ eubiq_pay_branch }}</td>
          </tr>
        </table>
      </div>

      <div class="panel-wrapper mt30">
        <div class="charge-message">
          <h4 class="title">您的转账信息：</h4>
          <table class="time-table">
            <tr>
              <td>开户名称：{{ oa_name }}</td>
              <td>银行账号：{{ oa_account }}7</td>
            </tr>
            <tr>
              <td>开户银行：{{ oa_bank }}</td>
              <td>开户支行：{{ oa_address }}</td>
            </tr>
          </table>
        </div>
        <div class="clearfix charge-operate">
          <table class="fl summary-info">
            <tbody>
              <tr>
                <td>
                  <span>商品合计:</span>
                  <span class="theme_font--color">¥{{ mainOrders[0].amount }}</span>
                </td>
                <td>
                  <span>运费:</span>
                  <span class="theme_font--color">到付</span>
                </td>
                <td>
                  <span>应付款:</span>
                  <span class="theme_font--color">¥{{ mainOrders[0].amount }}</span>
                </td>
                <!-- <td>
                  <span>优惠抵扣:</span>
                  <span class="theme_font--color">¥131213.00</span>
                </td> -->
              </tr>
            </tbody>
          </table>
          <!-- 待平台确认 -->
          <div v-if="status == 11" class="fr font-0">
            <a href="javascript: void(0);" class="btn danger">等待平台确认</a>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="summary panel-wrapper">
        <div class="remark">
          <h4 class="title">卖家留言</h4>
          <span>{{ mainOrders[0].remark }}</span>
        </div>
        <div class="order-time">
          <table class="time-table">
            <tr>
              <td v-if="mainOrders[0].create_time">下单时间：{{ mainOrders[0].create_time }}</td>
              <td v-if="mainOrders[0].deliver_time">发货时间：{{ mainOrders[0].deliver_time }}</td>
            </tr>
            <tr>
              <td v-if="mainOrders[0].pay_time">付款时间：{{ mainOrders[0].pay_time }}</td>
              <td v-if="mainOrders[0].finish_time">完成时间：{{ mainOrders[0].finish_time }}</td>
            </tr>
          </table>
        </div>
        <div class="clearfix">
          <table class="fl summary-info">
            <tbody>
              <tr>
                <td>
                  <span>商品合计:</span>
                  <span class="theme_font--color">¥{{ mainOrders[0].amount }}</span>
                </td>
                <td>
                  <span>运费:</span>
                  <span class="theme_font--color">到付</span>
                </td>
                <td>
                  <span>应付款:</span>
                  <span class="theme_font--color">¥{{ mainOrders[0].amount }}</span>
                </td>
                <!-- <td>
                  <span>优惠抵扣:</span>
                  <span class="theme_font--color">¥131213.00</span>
                </td> -->
              </tr>
            </tbody>
          </table>
          <div class="fr font-0">
            <template v-if="status == 8">
              <!-- 交易关闭 -->
              <a href="javascript: void(0);" class="btn danger" @click="deleteItem">删除订单</a>
            </template>
            <template v-else-if="status == 2">
              <!-- 待收货 -->
              <a href="javascript: void(0);" class="btn danger op5" @click="checkExpress">查看物流</a>
              <a href="javascript: void(0);" class="btn danger" @click="confirm">确认收货</a>
            </template>
            <template v-else-if="status == 0">
              <!-- 待收货 -->
              <a href="javascript: void(0);" class="btn danger" @click="pay">立即付款</a>
            </template>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import OrderGuide from './components/OrderGuide.vue'
import { requestOrderInfo, confirmOrder, removeOrder, checkPayInfo, requestPayBank } from '@/api/product.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    OrderGuide
  },
  data() {
    return {
      status: 0,
      to_name: '',
      to_tel: '',
      to_address: '',
      status_name: '',
      mainOrders: [],
      pay_channel: null,
      main_order_id: null,
      oa_name: '',
      oa_bank: '',
      oa_address: '',
      oa_account: '',
      eubiq_pay_company: '',
      eubiq_pay_bank: '',
      eubiq_pay_branch: '',
      eubiq_pay_account: '',
      order_id: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.requestInfo()
    this.order_id = this.$route.query.order_id
  },
  methods: {
    requestInfo() {
      requestOrderInfo({
        token: this.token,
        main_order_id: this.$route.params.id
      }).then(res => {
        if (res.errcode == 0) {
          const { to_name, to_tel, to_address, status, status_name, MainOrders, pay_channel, main_order_id } = res.data
          this.to_name = to_name
          this.to_tel = to_tel
          this.to_address = to_address
          this.status = status
          this.status_name = status_name
          this.mainOrders = MainOrders || []
          this.pay_channel = pay_channel
          this.main_order_id = main_order_id
          this.order_no = MainOrders[0].order_no
          if (status == 11) {
            this.getOfflineInfo()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 格式化
    formatTime(time) {
      const date = new Date(time)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    // 立即支付
    pay() {
      this.$router.push({ name: 'pay', query: { id: this.order_no }})
    },
    // 确认收货
    confirm() {
      confirmOrder({
        token: this.token,
        order_id: this.order_id
      }).then(res => {
        if (res.errcode == 0) {
          this.requestInfo()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看物流
    checkExpress() {
      this.$router.push({ name: 'express', query: { order_no: this.order_no }})
    },
    // 删除订单
    deleteItem() {
      removeOrder({
        token: this.token,
        main_order_id: this.main_order_id
      }).then(res => {
        if (res.errcode == 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取线下支付信息
    getOfflineInfo() {
      checkPayInfo({
        token: this.token,
        main_order_id: this.main_order_id
      }).then(res => {
        if (res.errcode == 0) {
          const { oa_name, oa_bank, oa_address, oa_account } = res.data
          this.oa_name = oa_name
          this.oa_bank = oa_bank
          this.oa_address = oa_address
          this.oa_account = oa_account
        }
      })
    },
    // 获取支付银行
    getPayBank() {
      requestPayBank().then(res => {
        if (res.errcode == 0) {
          const { eubiq_pay_company, eubiq_pay_bank, eubiq_pay_branch, eubiq_pay_account } = res.data
          this.eubiq_pay_company = eubiq_pay_company
          this.eubiq_pay_bank = eubiq_pay_bank
          this.eubiq_pay_branch = eubiq_pay_branch
          this.eubiq_pay_account = eubiq_pay_account
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-info {
  width: 1200px;
  margin: 30px auto;

  .address-info {
    width: 1200px;
    height: 112px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(74, 74, 74, 1);
    padding: 0 50px;
  }

  .title {
    color: #4A4A4A;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 30px;
  }

  .time-table {
    td {
      height: 40px;
      width: 275px;
    }
  }

  .status {
    &-label {
      display: inline-block;
      vertical-align: middle;
    }
    .warn {
      display: inline-block;
      vertical-align:  middle;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      position: relative;
      margin-left: 16px;
      &:before {
        content: "";
        width: 4px;
        height: 16px;
        position: absolute;
        top: 5px;
        left: 14px;
        background-color: white;
      }

      &:after {
        content: "";
        width: 4px;
        height: 4px;
        position: absolute;
        background-color: white;
        bottom: 5px;
        left: 14px;
      }
    }

    .complete {
      display: inline-block;
      vertical-align:  middle;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      position: relative;
      margin-left: 16px;
      background-color: rgba(80, 182, 116, 1);
      &:after {
        content: "";
        width: 20px;
        height: 10px;
        position: absolute;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        top: 8px;
        left: 6px;
        transform: rotate(-45deg);
      }
    }
  }

  .order-goods {
    margin: 30px 0;
    color: rgba(74, 74, 74, 1);
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

    .list-header {
      height: 60px;
      font-size: 16px;
      color: rgba(74, 74, 74, 1);
      font-weight: 600;
    }

    .list-item {
      text-align: center;
      height: 100px;
      font-size: 14px;
      color: rgba(74, 74, 74, 1);
      border-top: 1px solid rgba(12, 37, 67, .1);
      .good-image {
        width: 62px;
        height: 62px;
      }
    }
  }

  .account-message, .charge-message {
    padding: 30px 50px;
    overflow: hidden;
  }

  .charge-operate {
    overflow: hidden;
    border-top: 1px solid rgba(12, 37, 67, .1);
    .btn {
      border-radius: 0;
      font-size: 18px;
      width: 150px;
      height: 70px;
      line-height: 70px;
    }
  }

  .remark {
    padding: 30px 50px;
    overflow: hidden;
    border-bottom: 2px solid rgba(0,0,0,0.04);

    &-input {
      border: none;
      font-size: 18px;
      line-height: 25px;
      width: 100%;
    }
  }

  .purchase-time {
    padding: 30px 50px;
  }

  .summary {
    margin-bottom: 30px;
    overflow: hidden;
    .order-time {
      font-size: 14px;
      padding: 0 50px;
      height: 112px;
      display: table-cell;
      vertical-align: middle;
      color: rgba(74, 74, 74, 1);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      td {
        height: 32px;
      }
    }

    &-info {
      font-size: 18px;
      margin: 0 10px;
      border-collapse: separate;
      border-spacing: 40px 0;
      tr {
        height: 70px;
      }
    }

    .btn {
      border-radius: 0;
      font-size: 18px;
      width: 150px;
      height: 70px;
      line-height: 70px;
    }
  }

  .op5 {
    opacity: .5;
    transition: all .2s ease-in-out;
    &:hover {
      opacity: .8;
    }
  }
}
</style>
