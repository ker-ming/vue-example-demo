<template>
  <main class="pay-container">
    <nav class="panel-wrapper nav mt30">
      <h1 class="fl title">支付方式</h1>
      <span class="fr danger back" @click="$router.go(-1)">返回</span>
    </nav>

    <ul class="panel-wrapper mt30">
      <li v-if="payFlag" class="pay-item font-0" :class="{'check': checkItem == 0}" @click="check(0)">
        <img src="../../assets/yImg/balance.png" alt="">
        <span class="strong label">余额支付</span>
        <span class="label">当前余额¥{{ balance }}</span>
      </li>
      <li v-if="payFlag" class="pay-item font-0" :class="{'check': checkItem == 1}" @click="check(1)">
        <img src="../../assets/yImg/wx.png" alt="">
        <span class="strong label">微信支付</span>
      </li>
      <li v-if="payFlag" class="pay-item font-0" :class="{'check': checkItem == 2}" @click="check(2)">
        <img src="../../assets/yImg/zfb.png" alt="">
        <span class="strong label">支付宝支付</span>
      </li>
      <li v-if="payFlag" class="pay-item font-0" :class="{'check': checkItem == 3}" @click="check(3)">
        <img src="../../assets/yImg/card.png" alt="">
        <span class="strong label">银行卡支付</span>
      </li>
      <li class="pay-item font-0" :class="{'check': checkItem == 4}" @click="check(4)">
        <img src="../../assets/yImg/offline.png" alt="">
        <span class="strong label">线下支付</span>
      </li>
    </ul>

    <footer class="panel-wrapper mt30 clearfix">
      <div class="fr">
        <span class="font-0 money-number">
          <span>实付款:</span>
          <span class="theme_font--color">¥{{ pay_amount }}</span>
        </span>
        <a href="javascript: void(0);" class="danger confirm-btn" @click="pay">确认付款</a>
      </div>
    </footer>

    <el-dialog :visible.sync="showCode" width="460px" :show-close="false">
      <div class="dialog__wrapper">
        <div class="close danger" @click="showCode = false">关闭</div>
        <h4>需支付</h4>
        <div class="theme_font--color number">¥{{ pay_amount }}</div>
        <img :src="payImg" alt="">
        <router-link to="/myorder" style="display: block;margin-bottom: 20px;">若你已完成支付点击跳转至订单页面</router-link>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showSuccess" width="460px" :show-close="false">
      <div class="dialog__wrapper">
        <img src="../../assets/yImg/require.png" alt="">
        <div class="dialog__wrapper-inner">您已支付成功</div>
        <div class="font-0">
          <a href="javascript: void(0);" class="success button mr20 font-14" @click="toContinue">继续购物</a>
          <a href="javascript: void(0);" class="danger button font-14" @click="checkOrders">查看订单</a>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showPwd" width="938px" :show-close="false">
      <div class="dialog__wrapper">
        <h1 class="pay_dialog--title">输入支付密码</h1>
        <div>
          <div class="pay_dialog--subtitle">验证支付密码</div>
          <div>输入当前支付密码，以验证身份</div>
          <six-password v-model="password" />
          <div class="font-0">
            <a href="javascript: void(0);" class="danger button mr20 font-14 op5" @click="showPwd = false">取消</a>
            <a href="javascript: void(0);" class="danger button font-14" @click="payBalance">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import { getStore } from '../../utils/storage.js'
import { payUseBalance, userBalance } from '@/api/product.js'
import { mapGetters } from 'vuex'
import md5 from 'js-md5'
import SixPassword from './components/SixPassword.vue'
// import { request } from 'http'
import request from '@/utils/request'

export default {
  components: {
    SixPassword
  },
  data() {
    return {
      checkItem: 0,
      showCode: false,
      balance: 0,
      pay_amount: getStore('pay_amount') || 0,
      showPwd: false,
      password: '',
      showSuccess: false,
      retry: 0,
      payImg: '',
      lyCount: 0,
      payFlag: true,
      is_set_paypassword: 0
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'level'
    ])
  },
  created() {
    this.order_no = decodeURI(this.$route.query.order_no)
    this.doGetBalance()
    this.getUserInfo()
    if (this.level == '定制定购') {
      this.payFlag = false
      this.checkItem = 4
    }
    console.log(this.checkItem)
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      const self = this
      request({
        url: '/member/user-api/info',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.is_set_paypassword = res.data.is_set_paypassword
      })
    },
    check(item) {
      this.checkItem = item
    },
    pay() {
      const self = this
      if (this.checkItem === 0) {
        if (this.is_set_paypassword == 0) {
          this.$confirm('未设置支付密码，是否去设置支付密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({ path: '/partners', query: { pIndex: 3, key: 3 }})
          })
          return
        }
        // 余额支付
        this.showPwd = true
      } else if (this.checkItem === 1) {
        // 微信
        request({
          url: '/pay/pay-api/wechat-pc',
          method: 'post',
          data: {
            token: self.token,
            order_id: self.order_no
          }
        }).then(res => {
          this.payImg = res.data
          this.showCode = true
        }).catch(() => {
          if (this.retry++ < 2) {
            setTimeout(function() {
              self.pay()
            }, 1000)
          } else {
            this.retry = 0
          }
        })
      } else if (this.checkItem === 2) {
        // 支付宝
        // this.showCode = true
        request({
          url: '/pay/pay-api/ali-pc',
          method: 'post',
          data: {
            token: self.token,
            order_id: self.order_no
          }
        }).then(res => {
          window.location.href = res.data
        }).catch(() => {
          if (this.retry++ < 2) {
            setTimeout(function() {
              self.pay()
            }, 1000)
          } else {
            this.retry = 0
          }
        })
      } else if (this.checkItem === 3) {
        this.showCode = true
      } else if (this.checkItem === 4) {
        this.$router.push({ name: 'offline', query: { order_no: this.order_no }})
      }
    },
    // 余额支付
    payBalance() {
      payUseBalance({
        token: this.token,
        order_id: this.order_no,
        password: md5(this.password)
      }).then(res => {
        this.showPwd = false
        if (res.errcode == 0) {
          this.showSuccess = true
        } else if (res.errcode == 30006) { // 返回订单不存在的时候，请求三次
          if (this.retry++ < 2) {
            this.payBalance()
          } else {
            this.retry = 0
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取余额
    doGetBalance() {
      userBalance({
        token: this.token
      }).then(res => {
        if (res.errcode == 0) {
          this.balance = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toContinue() {
      this.showSuccess = false
      this.$router.push({ path: '/product' })
    },
    checkOrders() {
      this.showSuccess = false
      this.$router.push({ name: 'myorder' })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-container {
  width: 1200px;
  margin: 0 auto;
  .nav {
    height: 106px;
    padding: 0 50px;
    .title {
      margin: 30px 0;
      font-size: 32px;
      color: #0C2543;
      line-height: 45px;
    }

    .back {
      font-size: 14px;
      display: inline-block;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 4px;
      margin: 37px 0;
      cursor: pointer;
      transition: all .2s ease-in-out;
      &:hover {
        opacity: .9;
      }
    }
  }

  .pay-item {
    height: 70px;
    line-height: 70px;
    position: relative;
    border-bottom: 1px solid #d8d8d8;
    padding-left: 30px;
    img {
      width: 29px;
      height: 29px;
      display: inline-block;
      vertical-align: middle;
    }
    .label {
      font-size: 16px;
      color: #4a4a4a;
      margin-left: 20px;
      vertical-align: middle;
    }
  }

  .check {
    &:before {
      content: "";
      position: absolute;
      top: 27px;
      right: 50px;
      width: 16px;
      height: 16px;
      background: rgba(255,24,29,1);
    }
    &:after {
      content: "";
      position: absolute;
      top: 31px;
      right: 53px;
      width: 10px;
      height: 5px;
      transform: rotate(-45deg);
      border-left: 2px solid white;
      border-bottom: 2px solid white;
    }
  }

  .money-number {
    margin-right: 50px;
    span {
      font-size: 16px;
    }
  }

  .confirm-btn {
    width: 153px;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    text-align: center;
    display: inline-block;
  }

  .dialog__wrapper {
    width: 100%;
    padding: 0;
    text-align: center;
    position: relative;
    overflow: hidden;
    h4 {
      font-size: 24px;
      line-height: 32px;
      margin: 20px 0;
    }

    .number {
      font-size: 24px;
      line-height: 32px;
    }

    img {
      width: auto;
      height: 232px;
      margin: 40px 0 60px 0;
    }

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
    }

    .button {
      width: 90px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      margin: 24px 0 34px 0;
      border-radius: 4px;
    }

    .success {
      border: 1px solid #FF181D;
    }

    .mr20 {
      margin-right: 20px;
    }

    .op5 {
      opacity: .5;
    }

    .pay_dialog--title {
      font-size: 32px;
      color: #0C2543;
      margin: 0;
      line-height: 45px;
      text-align: left;
      font-weight: 100;
      padding: 30px 50px;
      border-bottom: 1px solid rgba(12, 37, 67, .2);
    }

    .pay_dialog--subtitle {
      font-size: 30px;
      line-height: 42px;
      margin: 125px 0 15px 0;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
