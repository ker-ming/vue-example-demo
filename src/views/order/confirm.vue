<template>
  <main class="container">
    <div class="address">
      <div class="address-title">
        <a href="javascript: void(0);">确认订单</a>
      </div>
      <table style="width: 100%;">
        <tr v-for="item in address" :key="item.maid" class="font-0 address-li">
          <td>
            <input type="radio" class="reset-radio" name="address" :value="1" :checked="addressId === item.maid" @click="addressId = item.maid;is_cloud_repy = 0">
          </td>
          <td width="1030">
            <table class="address-info">
              <tbody>
                <tr>
                  <td width="250">姓名：{{ item.name }}</td>
                  <td>所在地区：{{ item.full_name.split(' ')[0] }}</td>
                </tr>
                <tr>
                  <td width="250">电话：{{ item.tel }}</td>
                  <td>详细地址：{{ item.full_name.split(' ')[1] }}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <div class="font-0 address-right">
              <span v-if="item.is_top == 1" class="tag">默认</span>
              <span class="edit" @click="editAddress">编辑</span>
            </div>
          </td>
        </tr>
      </table>
      <div class="address-footer">
        <input type="checkbox" class="reset-radio" :checked="is_cloud_repy === 1" @click="saveInCloud">
        <span class="footer-text">保存在公司总部仓库（可以在我的个人中心——我的库存查看及操作）</span>
      </div>
    </div>
    <div class="cart">
      <table border="0" style="width: 100%">
        <thead>
          <tr class="cart-header">
            <th width="150">产品图片</th>
            <th width="250">产品名称</th>
            <th width="250">型号规格</th>
            <th width="200">单价</th>
            <th width="200">数量</th>
            <!-- <th width="150">折扣优惠</th> -->
            <th width="150">小计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in store_list" :key="index" class="cart-item">
            <td width="150">
              <img class="avatar" :src="item.img_url" alt="">
            </td>
            <td width="250">{{ item.title }}</td>
            <td width="250">型号：{{ item.value_names }}</td>
            <td width="200">¥{{ item.price }}</td>
            <td width="200">{{ item.num }}</td>
            <!-- <td width="150">9.00%</td> -->
            <td width="150" class="theme_font--color">¥{{ item.num * item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="summary">
      <div class="remark">
        <h4 class="remark-tit">卖家留言</h4>
        <input v-model="remark" type="text" class="remark-input" placeholder="选填，最多140字">
      </div>
      <div class="clearfix">
        <table class="fl summary-info">
          <tbody>
            <tr>
              <td>
                <span>商品合计:</span>
                <span class="theme_font--color">¥{{ totalPrice }}</span>
              </td>
              <td>
                <span>运费:</span>
                <span class="theme_font--color">到付</span>
              </td>
              <td>
                <span>应付款:</span>
                <span class="theme_font--color">¥{{ totalPrice }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="fr">
          <a href="javascript: void(0);" class="btn" @click="$router.go(-1)">返回购物车</a>
          <a href="javascript: void(0);" class="btn danger" @click="commit">提交订单</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { setStore } from '../../utils/storage.js'
import { requestAddress, createOrder } from '@/api/product.js'
export default {
  name: 'Confirm',
  data() {
    return {
      addressId: null,
      is_cloud_repy: 0,
      address: [],
      remark: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'store_list'
    ]),
    totalPrice() {
      let count = 0
      if (this.store_list) {
        this.store_list.map(item => {
          count += (parseInt(item.num) * parseInt(item.price))
        })
      }
      return count
    }
  },
  created() {
    this.doGetAddress()
    console.log(this.store_list)
  },
  methods: {
    doGetAddress() {
      requestAddress({
        token: this.token,
        start_page: 0,
        pages: 10
      }).then(res => {
        if (res.errcode == 0) {
          this.address = res.data.list || []
          if (this.address.length > 0) {
            for (let i = 0, len = this.address.length; i < len; i++) {
              if (this.address[i].is_top == 1) {
                this.addressId = this.address[i].maid
                break
              }
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    commit() {
      if (!this.addressId && !this.is_cloud_repy) {
        this.$message({
          message: '未选中收货地址',
          type: 'warning'
        })
        return
      }
      if (!this.store_list || this.store_list.length == 0) {
        this.$message({
          message: '商品不存在',
          type: 'warning'
        })
        return
      }
      const item_data = this.store_list.map(item => {
        return {
          ivid: item.ivid,
          num: item.num,
          cart_id: item.cart_id
        }
      })
      createOrder({
        token: this.token,
        address_id: this.addressId,
        amount: this.totalPrice,
        is_cloud_repy: this.is_cloud_repy,
        sections: [
          {
            item_data,
            remark: this.remark
          }
        ]
      }).then(res => {
        if (res.errcode == 0) {
          this.$router.replace({
            name: 'pay',
            query: {
              order_no: encodeURI(res.data.pay_order_no)
            }
          })
          setStore('pay_amount', res.data.pay_amount)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    saveInCloud() {
      if (this.is_cloud_repy == 1) {
        this.is_cloud_repy = 0
      } else {
        this.addressId = null
        this.is_cloud_repy = 1
      }
    },
    // 编辑地址
    editAddress() {
      this.$router.push({ path: '/partners?pIndex=2&key=3' })
    }
  },
  beforeRouteLeave(to, from, next) {
    // 离开该页面的时候要删除缓存
    // this.$store.commit('order/REMOVE_LOCALSTORAGE')
    next()
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 30px auto;
  .address {
    background-color: white;
    margin-bottom: 30px;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    border-radius: 4px;
    &-title {
      height: 105px;
      padding: 0 50px;
      font-size: 32px;
      line-height: 105px;
      color: rgba(12, 37, 67, 1);
      border-bottom: 1px solid rgba(12, 37, 67, .2);
    }

    &-li {
      height: 112px;
      box-sizing: border-box;
      vertical-align: middle;
      border-bottom: 1px solid #D8D8D8;
      input {
        margin-left: 30px;
      }
    }

    &-info {
      font-size: 14px;
      color: #4A4A4A;
      margin: 0 22px;
      line-height: 20px;
      border-spacing: 10px;
      vertical-align: middle;
      border-collapse: separate;
    }

    &-right {
      text-align: right;
      margin-right: 30px;
    }

    &-footer {
      height: 80px;
      padding: 0 32px;
      line-height: 80px;
      font-size: 0;
    }

    .footer-text {
      font-size: 16px;
      color: #4A4A4A;
      display: inline-block;
      vertical-align: middle;
      margin-left: 32px;
    }

    .reset-radio {
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      appearance: none;
      position: relative;
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        border: 1px solid #979797;
        display: inline-block;
        // vertical-align: middle;
      }
      &:checked:before {
        content: '';
        width: 16px;
        height: 16px;
        border: 1px solid #FF181D;
        background:#FF181D;
        display: inline-block;
        // vertical-align: middle;
      }
      &:checked:after{
        content: '';
        width: 10px;
        height: 5px;
        border: 2px solid white;
        border-top: transparent;
        border-right: transparent;
        text-align: center;
        display: block;
        position: absolute;
        top: 4px;
        left: 3px;
        transform: rotate(-45deg);
      }
    }

    .tag {
      width: 54px;
      height: 30px;
      color: white;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      display: inline-block;
      border-radius: 15px;
      transform: scale(.8);
      cursor: pointer;
      background: rgba(255,24,29,1);
    }

    .edit {
      color: #FF181D;
      font-size: 14px;
      user-select: none;
      cursor: pointer;
    }
  }

  .cart {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 4px;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    &-header {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: rgba(74, 74, 74, 1);
    }

    &-item {
      height: 100px;
      font-size: 14px;
      text-align: center;
      color: rgba(74, 74, 74, 1);
      border-top: 1px solid rgba(12, 37, 67, .1);
      .avatar {
        width:62px;
        height:62px;
      }
    }
  }

  .summary {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 4px;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    .remark {
      padding: 0 50px;
      overflow: hidden;
      border-bottom: 2px solid rgba(0,0,0,0.04);
      &-tit {
        color: #4A4A4A;
        font-size: 16px;
        line-height: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
      }

      &-input {
        border: none;
        font-size: 18px;
        line-height: 25px;
        margin-bottom: 40px;
        width: 100%;
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
}
</style>
