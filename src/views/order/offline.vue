<template>
  <main class="pay-container">
    <nav class="panel-wrapper nav mt30">
      <h1 class="fl title">线下支付</h1>
      <span class="fr danger back" @click="$router.go(-1)">返回</span>
    </nav>

    <div class="panel-wrapper mt30 account-message">
      <h4>请您通过网银转账，或者自行到银行进行汇款，汇款账号如下：</h4>
      <table>
        <tr>
          <td width="275">开户名称：{{ eubiq_pay_company }}</td>
          <td width="275">银行账号：{{ eubiq_pay_account }}</td>
        </tr>
        <tr>
          <td width="275">开户银行：{{ eubiq_pay_bank }}</td>
          <td width="275">开户支行：{{ eubiq_pay_branch }}</td>
        </tr>
      </table>
    </div>

    <div class="panel-wrapper mt30 account-form">
      <h4>您的转账信息：</h4>
      <el-form ref="accountForm" class="form" :model="form" :rules="rules">
        <el-form-item prop="name">
          <div>开户名称：</div>
          <el-input v-model="form.name" placeholder="请输入开户名称" />
        </el-form-item>
        <el-form-item prop="bank">
          <div>开户银行：</div>
          <el-input v-model="form.bank" placeholder="请输入开户银行" />
        </el-form-item>
        <el-form-item prop="branch">
          <div>开户支行：</div>
          <el-input v-model="form.branch" placeholder="请输入开户支行" />
        </el-form-item>
        <el-form-item prop="account">
          <div>银行账户：</div>
          <el-input v-model="form.account" placeholder="请输入银行账户" />
        </el-form-item>
      </el-form>
    </div>

    <footer class="panel-wrapper mt30 clearfix">
      <div class="fr">
        <span class="font-0 money-number">
          <span>实付款:</span>
          <span class="theme_font--color">¥{{ pay_amount }}</span>
        </span>
        <a href="javascript: void(0);" class="danger confirm-btn" @click="confirm">确认付款</a>
      </div>
    </footer>

    <el-dialog :visible.sync="showCode" width="460px" :show-close="false" :close-on-click-modal="false">
      <div class="dialog__wrapper">
        <img src="../../assets/yImg/require.png" alt="">
        <div class="dialog__wrapper-inner">你的线下支付申请已提交至平台，转账后请耐心等待平台确认</div>
        <a href="javascript: void(0);" class="danger button font-18" @click="close">确定</a>
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
            <a href="javascript: void(0);" class="danger button font-14" @click="pay">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import { getStore } from '../../utils/storage.js'
import SixPassword from './components/SixPassword.vue'
import { requestPayBank, payUseOffline } from '@/api/product.js'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
export default {
  components: {
    SixPassword
  },
  data() {
    return {
      showCode: false,
      form: {
        name: '',
        bank: '',
        branch: '',
        account: ''
      },
      pay_amount: getStore('pay_amount') || 0,
      eubiq_pay_company: '',
      eubiq_pay_bank: '',
      eubiq_pay_branch: '',
      eubiq_pay_account: '',
      rules: {
        name: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请输入支行名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ]
      },
      order_no: this.$route.query.order_no,
      showPwd: false,
      password: '',
      retry: 0
    }
  },
  created() {
    this.doGetBankInfo()
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    confirm() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.showPwd = true
        } else {
          return false
        }
      })
    },
    pay() {
      if (this.password.length < 6) {
        this.$message({
          message: '请输入完整的支付密码',
          type: 'warning'
        })
      }
      payUseOffline({
        token: this.token,
        oa_name: this.form.name,
        oa_bank: this.form.bank,
        oa_address: this.form.branch,
        oa_account: this.form.account,
        order_id: this.order_no,
        password: md5(this.password)
      }).then(res => {
        this.showPwd = false
        if (res.errcode == 0) {
          this.showCode = true
        } else if (res.errcode == 30006) {
          if (this.retry++ < 3) {
            this.pay()
          } else {
            this.retry = 0
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    doGetBankInfo() {
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
    },
    toContinue() {
      this.showCode = false
      this.$router.push({ path: '/product' })
    },
    checkOrders() {
      this.showCode = false
      this.$router.push({ name: 'myorder' })
    },
    close() {
      this.$router.replace({ name: 'product' })
      this.showCode = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-container {
  width: 1200px;
  margin: 30px auto;
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

  .account-message {
    padding: 30px 50px;
    h4 {
      font-size: 16px;
      line-height: 22px;
    }

    table {
      font-size: 14px;
      line-height: 20px;
      td {
        height: 40px;
      }
    }
  }

  .account-form {
    padding: 30px 50px;
    h4 {
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 20px;
    }

    .form {
      width: 485px;
      color: #4A4A4A;
      font-size: 18px;
    }
  }

  .dialog__wrapper {
    width: 100%;
    padding: 0;
    text-align: center;
    position: relative;

    img {
      width: auto;
      height: 60px;
      margin: 40px 0 20px 0;
      background-color: white;
    }

    &-inner {
      color: #AEAEAE;
      font-size: 14px;
      width: 310px;
      line-height: 20px;
      text-align: center;
      margin: 0 auto;
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
