
<template>
  <div class="myAccount">
    <div v-if="!mAccountFlag" class="myAccount-top">
      <div class="myAccount-top-title">
        <h1>我的账户</h1>
        <h2>支付密码</h2>
        <h3 @click="dialogTableVisible1 = true">{{ is_set_paypassword == 0? '点击设置': '点击修改' }}</h3>
        <h4 />
        <span>提成余额 ￥：{{ mAccountData.balance }}</span>
        <el-button type="primary" @click="setMAccountFlag(3)">提现</el-button>
      </div>
      <ul class="myAccount-top-content">
        <li>
          <h1>{{ mAccountData.total_income || 0 }}</h1>
          <p>累计总提成(万)</p>
        </li>
        <li>
          <h1>{{ mAccountData.balance || 0 }}</h1>
          <p>可提现提成(万)</p>
        </li>
        <li>
          <h1>{{ mAccountData.use_balance || 0 }}</h1>
          <p>已提现提成(万)</p>
        </li>
        <li>
          <h1>{{ mAccountData.pay_balance || 0 }}</h1>
          <p>余额(万)</p>
        </li>
      </ul>
    </div>
    <div v-if="!mAccountFlag" class="myAccount-center">
      <div class="myAccount-center-title">
        <p>绑定银行卡</p>
        <span @click="dialogTableVisible2 = true">添加银行卡</span>
      </div>
      <ul class="myAccount-center-content">
        <li v-for="(item,index) in cardList" :key="index">
          <img src="" alt="">
          <h4 />
          <p />
          <span @click="unbindCard(item.id)">解绑此卡</span>
        </li>
      </ul>

    </div>
    <div v-if="!mAccountFlag" class="myAccount-bottom">
      <div class="myAccount-bottom-title">
        <span :class="detailIndex === 1 ? 'active': ''" @click="switchDetail(1)">提现明细</span>
        <span :class="detailIndex === 2 ? 'active': ''" @click="switchDetail(2)">交易明细</span>
      </div>
      <div class="myAccount-bottom-content">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="create_time"
            label="时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="order_no"
            label="流水号"
            width="180"
            align="center"
          />
          <el-table-column
            prop="address"
            label="类型"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="detailIndex === 1 && scope.row.third_type == 1">提现到银行卡</span>
              <span v-if="detailIndex === 1 && scope.row.third_type == 2">提现到微信</span>
              <span v-if="detailIndex === 2 && scope.row.type == 80">后台充值</span>
              <span v-if="detailIndex === 2 && scope.row.type == 81">首次购销</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="金额"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="detailIndex === 1" style="color: #FF181D">{{ scope.row.old_price }}</span>
              <span v-if="detailIndex === 2" :style="{color: scope.row.type == 80 ? '#4FAB80' : '#FF181D'}">{{ scope.row.type == 80 ? '+' : '-' }}{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.audit == 1">待审核</span>
              <span v-if="scope.row.audit == 2">审核通过</span>
              <span v-if="scope.row.audit == 3">待审核</span>
              <span v-if="scope.row.settlement_status == 0">未结算</span>
              <span v-if="scope.row.settlement_status == 1">已结算</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total_pages"
          :current-page="start_page+ 1"
          @current-change="pageChange"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible1"
      width="800px"
      :show-close="false"
      @close="handleClose"
    >
      <div class="myAccount-dialog1-title">
        <h1>{{ is_set_paypassword == 0? '设置': '修改' }}支付密码</h1>
        <span @click="dialogTableVisible1 = false">取消</span>
      </div>
      <div class="myAccount-dialog1-content">
        <el-form ref="payPasswordForm" :model="payPasswordForm" :rules="payPasswordrules">
          <el-form-item label="手机号码" prop="real_name">
            <el-input v-model="phone" disabled />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="code">
              <el-input v-model="payPasswordForm.code" type="password" placeholder="请输入验证码" />
              <span @click="getCode">{{ myAccountCode }}</span>
            </div>
          </el-form-item>
          <el-form-item label="设置支付密码" prop="password">
            <el-input v-model="payPasswordForm.password" type="password" placeholder="请输入支付密码" />
          </el-form-item>
          <el-form-item label="验证支付密码" prop="tPassword">
            <el-input v-model="payPasswordForm.tPassword" type="password" placeholder="请再次输入密码" />
          </el-form-item>
          <el-button type="primary" @click="setPayPassword">确定</el-button>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTableVisible2"
      width="800px"
      :show-close="false"
    >
      <h1 class="myAccount-dialog2-title">绑定银行卡</h1>
      <div class="myAccount-dialog2-content">
        <div @click="setMAccountFlag(1)">
          <img src="@/assets/yImg/g1.png" alt="">
          <p>个人银行卡</p>
        </div>
        <div @click="setMAccountFlag(2)">
          <img src="@/assets/yImg/g2.png" alt="">
          <p>企业银行卡</p>
        </div>
      </div>
    </el-dialog>
    <div v-if="mAccountFlag === 1" class="bindCard">
      <div class="myAccount-top-title">
        <h1>绑定银行卡(个人)</h1>
        <h4 />
        <el-button type="primary" @click="accountBack">返回</el-button>
      </div>
      <el-form ref="bindCardForm1" :model="bindCardForm1" :rules="bindCardrules" class="bindCard-content">
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="bindCardForm1.real_name" placeholder="请输入您身份证上的姓名" />
        </el-form-item>
        <el-form-item label="银行" prop="bank_code">
          <div style="width: 100%;display:inline-block">
            <el-select v-model="bindCardForm1.bank_code" placeholder="请选择">
              <el-option
                v-for="item in cardOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_card">
          <el-input v-model="bindCardForm1.bank_card" placeholder="请输入银行卡账号" />
        </el-form-item>
        <el-button type="primary" @click="accountSave">确定</el-button>
      </el-form>
    </div>
    <div v-if="mAccountFlag === 2" class="bindCard">
      <div class="myAccount-top-title">
        <h1>绑定银行卡(企业)</h1>
        <h4 />
        <el-button type="primary" @click="accountBack">返回</el-button>
      </div>
      <el-form ref="bindCardForm2" :model="bindCardForm2" :rules="bindCardrules" class="bindCard-content">
        <p>请填写您的单位信息</p>
        <el-form-item label="单位名称" prop="company_name">
          <el-input v-model="bindCardForm2.company_name" placeholder="请输入营业执照上登记的名称" />
        </el-form-item>
        <el-form-item label="证件号" prop="company_code">
          <el-input v-model="bindCardForm2.company_code" placeholder="请输入社会统一信用代码" />
        </el-form-item>
        <p>请填写您的银行对公账户信息</p>
        <el-form-item label="银行" prop="bank_code">
          <div style="width: 100%;display:inline-block">
            <el-select v-model="bindCardForm2.bank_code" placeholder="请选择">
              <el-option
                v-for="item in cardOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_card">
          <el-input v-model="bindCardForm2.bank_card" placeholder="请输入银行卡账号" />
        </el-form-item>
        <el-button type="primary" @click="accountSave">确定</el-button>
      </el-form>
    </div>
    <div v-if="mAccountFlag === 3" class="bindCard">
      <div class="myAccount-top-title">
        <h1>提现</h1>
        <h4 />
        <el-button type="primary" @click="accountBack">返回</el-button>
      </div>
      <el-form ref="applyCash" :model="applyCash" :rules="applyCashrules" class="applyCash">
        <el-form-item label="提现到" prop="card_id">
          <el-select v-model="applyCash.card_id" placeholder="请选择">
            <el-option
              v-for="item in cardList"
              :key="item.id"
              :label="item.bank_card"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提现金额" prop="price">
          <el-input v-model="applyCash.price" placeholder="请输入提现金额" />
        </el-form-item>
        <el-form-item label="" prop="bank_card">
          <p>
            提现金额：最小提现金额为1元，每日提现限额<=500元，若金额超出，请于次日进行提现。
            到账时间，一般为3个工作日内，实际到账时间，可能会受相关金融机构影响。
          </p>
        </el-form-item>
        <el-button type="primary" @click="accountSave">确定</el-button>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible3"
      width="460px"
      :show-close="false"
      top="15%"
    >
      <div class="applyCash-dialog">
        <img src="@/assets/yImg/g3.png" alt="">
        <p>您的提现申请已提交至平台，请耐心等待平台审核</p>
        <el-button type="primary" @click="dialogTableVisible3 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import md5 from 'js-md5'

export default {
  name: 'Address',
  data() {
    const validateName = (rule, value, callback) => {
      if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value)) {
        callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    const validateBankCard = (rule, value, callback) => {
      if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(value)) {
        callback(new Error('请输入正确的银行卡号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (!/^[A-Za-z0-9]{5,}$/.test(value)) {
        callback(new Error('密码中只能存在数字和字母'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (this.payPasswordForm.password !== this.payPasswordForm.tPassword) {
        callback(new Error('两次密码输入不同'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      detailIndex: 1,
      mAccountData: {},
      cardList: [],
      mAccountFlag: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      payPasswordForm: {
        password: '',
        tPassword: '',
        code: ''
      },
      bindCardrules: {
        real_name: [{ required: true, trigger: 'blur', validator: validateName }],
        bank_card: [{ required: true, trigger: 'blur', validator: validateBankCard }],
        bank_code: [{ required: true, trigger: 'change', message: '请选择银行' }],
        company_name: [{ required: true, trigger: 'blur', message: '请填写单位名称' }],
        company_code: [{ required: true, trigger: 'blur', message: '请填写会统一信用代码' }]
      },
      payPasswordrules: {
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
        code: [{ required: true, trigger: 'change', message: '请填写验证码' }],
        tPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }]
      },
      applyCashrules: {
        card_id: [{ required: true, trigger: 'change', message: '请选择银行卡' }],
        price: [{ required: true, trigger: 'change', message: '请填写提现金额' }]
      },
      applyCash: {
        card_id: '',
        price: ''
      },
      bindCardForm1: {
        real_name: '',
        bank_card: '',
        bank_code: ''
      },
      bindCardForm2: {
        company_name: '',
        company_code: '',
        bank_card: '',
        bank_code: ''
      },
      cardOptions: [],
      is_set_paypassword: 0,
      myAccountCode: '点击获取',
      timer: '',
      num: 60,
      start_page: 0,
      total_pages: 0,
      switchFlag: 1
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'phone'
    ])
  },
  created() {
    this.getList()
    this.getDetail(1)
    this.getCardList()
    this.bankCode()
    this.getUserInfo()
  },
  methods: {
    // 获取验证码
    getCode(index) {
      const self = this
      if (this.num !== 60) return
      request({
        url: '/member/user-api/send-sms',
        method: 'post',
        data: {
          phone: self.phone,
          type: 'payPassword'
        }
      }).then(() => {
        this.$message({
          message: '验证码已发送',
          type: 'success',
          showClose: true
        })
        this.timer = setInterval(function() {
          self.num--
          if (self.num <= 0) {
            self.myAccountCode = '点击获取'
            self.num = 60
            clearInterval(self.timer)
          } else {
            self.myAccountCode = self.num + '秒后再次获取'
          }
        }, 1000)
      })
    },
    // 设置支付密码
    setPayPassword() {
      let data = ''
      let url = ''
      if (this.is_set_paypassword == 0) {
        url = '/member/user-api/set-pay-password'
        data = {
          token: this.token,
          password: md5(this.payPasswordForm.password)
        }
      } else if (this.is_set_paypassword == 1) {
        url = '/member/user-api/set-pay-password'
        data = {
          token: this.token,
          password: md5(this.payPasswordForm.password),
          code: this.payPasswordForm.code
        }
      }

      this.$refs.payPasswordForm.validate(valid => {
        if (valid) {
          request({
            url,
            method: 'post',
            data
          }).then(res => {
            this.$message({
              message: '设置密码成功',
              type: 'success',
              showClose: true
            })
            this.getUserInfo()
            this.dialogTableVisible1 = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
    // 解绑银行卡
    unbindCard(id) {
      const self = this
      this.$confirm('是否解绑此银行卡', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/cash/bank-card-api/unbind-card',
          method: 'post',
          data: {
            token: self.token,
            card_id: id
          }
        }).then(res => {
          this.$message({
            message: '成功解绑银行卡',
            type: 'success',
            showClose: true
          })
          this.getCardList()
        })
      })
    },
    // 添加银行卡
    accountSave() {
      const self = this
      if (this.mAccountFlag === 1) {
        this.$refs.bindCardForm1.validate(valid => {
          if (valid) {
            request({
              url: '/cash/bank-card-api/bind-card',
              method: 'post',
              data: {
                token: self.token,
                type: self.mAccountFlag,
                bank_code: self.bindCardForm1.bank_code,
                bank_card: self.bindCardForm1.bank_card,
                real_name: self.bindCardForm1.real_name
              }
            }).then(res => {
              this.$message({
                message: '添加银行卡成功',
                type: 'success',
                showClose: true
              })
              this.getCardList()
              this.accountBack()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (this.mAccountFlag === 2) {
        this.$refs.bindCardForm2.validate(valid => {
          if (valid) {
            request({
              url: '/cash/bank-card-api/bind-card',
              method: 'post',
              data: {
                token: self.token,
                type: self.mAccountFlag,
                company_name: self.bindCardForm2.company_name,
                company_code: self.bindCardForm2.company_code,
                bank_code: self.bindCardForm2.bank_code,
                bank_card: self.bindCardForm2.bank_card
              }
            }).then(res => {
              this.$message({
                message: '添加银行卡成功',
                type: 'success',
                showClose: true
              })
              this.getCardList()
              this.accountBack()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (this.mAccountFlag === 3) {
        // 提现
        this.$refs.applyCash.validate(valid => {
          if (valid) {
            request({
              url: '/hand/me-cash-api/apply-cash',
              method: 'post',
              data: {
                token: self.token,
                price: self.applyCash.price,
                card_id: self.applyCash.card_id
              }
            }).then(res => {
              this.dialogTableVisible3 = true
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 返回
    accountBack() {
      this.mAccountFlag = false
      this.bindCardForm1 = {
        real_name: '',
        bank_card: '',
        bank_code: ''
      }
      this.bindCardForm2 = {
        company_name: '',
        company_code: '',
        bank_card: '',
        bank_code: ''
      }
      this.applyCash = {
        card_id: '',
        price: ''
      }
      this.$refs.bindCardForm1.resetFields()
      this.$refs.bindCardForm2.resetFields()
      this.$refs.applyCash.resetFields()
    },
    // 银行编码
    bankCode() {
      const self = this
      request({
        url: '/hand/me-cash-api/bank',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.cardOptions = res.data
      })
    },
    // 添加银行卡选择
    setMAccountFlag(index) {
      let flag = true
      if (index === 2) {
        console.log(this.cardList)
        this.cardList.map(item => {
          if (item.type == 2) {
            flag = false
            this.$message({
              message: '只能添加一张企业银行卡',
              type: 'warning',
              showClose: true
            })
          }
        })
      }
      if (!flag) {
        return
      }
      this.mAccountFlag = index
      this.dialogTableVisible2 = false
    },
    //
    handleClose() {
      this.$refs.payPasswordForm.resetFields()
    },
    //   获取账户信息
    getList() {
      const self = this
      request({
        url: '/hand/me-cash-api/account-info',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.mAccountData = res.data
      })
    },
    // 切换页数
    pageChange(data) {
      this.start_page = data - 1
      this.getDetail()
    },
    // 切换明细
    switchDetail(index) {
      this.start_page = 0
      this.switchFlag = index
      this.getDetail()
    },
    // 获取明细
    getDetail() {
      this.detailIndex = this.switchFlag
      const self = this
      let url = ''
      if (this.switchFlag === 1) {
        url = '/hand/me-cash-api/get-cash-list'
      } else if (this.switchFlag === 2) {
        url = '/hand/me-cash-api/trade-list'
      }
      request({
        url,
        method: 'post',
        data: {
          token: self.token,
          start_page: self.start_page,
          pages: 10
        }
      }).then(res => {
        this.tableData = res.data.list
        this.total_pages = res.data.total_pages - 0
      })
    },
    //   获取银行卡列表
    getCardList() {
      const self = this
      request({
        url: '/cash/bank-card-api/card-list',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.cardList = res.data || []
      })
    },
    // 删除
    delect(maid) {
      const self = this
      this.$confirm('是否删除地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/shop/me-address-api/delete',
          method: 'post',
          data: {
            token: self.token,
            maid
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            showClose: true
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style lang="scss" >
  .myAccount{
    &-top{
        height: 256px;
        // border-bottom: 30px solid #F6F6F6;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        &-title{
            display: flex;
            align-items: center;
            padding: 0 50px;
            height: 105px;
            border-bottom: 1px solid #ddd;
            h1{
                font-size: 32px;
                font-weight: 400;
                margin-right: 30px;
            }
            h2{
                font-size: 16px;
                font-weight: 400
            }
            h3{
                font-weight: 400;
                font-size: 16px;
                color: #FF181D;
                margin-left: 20px;
                cursor: pointer
            }
            h4{
                flex: 1
            }
            .el-button{
                margin-left: 40px;
            }
        }
        &-content{
            display: flex;
            align-items: center;
            justify-content: space-around;
            li{
                text-align: center;
                padding: 10px 0 0 0;
                h1{
                    margin-bottom: 10px;
                }
                p{
                    color: #A1A1A1
                }
            }
        }
    }
    &-center{
        // border-bottom: 30px solid #F6F6F6;
        margin-bottom: 30px;
        background: #fff;
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        &-title{
            display: flex;
            padding: 0 50px;
            align-items: center;
            justify-content: space-between;
            height: 62px;
            border-bottom: 1px solid #ddd;
            span{
              color: #FF181D;
              cursor: pointer
            }
        }
        &-content{
          li{
            padding: 0 50px;
            display: flex;
            align-items: center;
            height: 100px;
            border-bottom: 1px solid #edd;
            img{
              width: 38px;
              height: 38px;
            }
            h4{
              font-size: 14px;
            }
            p{
              flex: 1
            }
            span{
              color: #aaa;
              cursor: pointer;
            }
          }
        }
    }
    &-bottom{
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      &-title{
        display: flex;
        height: 105px;
        align-items: center;
        padding-left: 50px;
        border-bottom: 1px solid #ddd;
        .active{
          font-size: 24px;
          color: #000;
          font-weight: 600
        }
        span{
          color:#aaa;
          font-size: 18px;
          margin-right: 20px;
          font-weight: 400;
          cursor: pointer;
        }
      }
      &-content{
        overflow: hidden;
        .el-table__body-wrapper{
          .el-table__row{
            td:nth-child(4){
              color: #FF181D
            }
          }
        }
      }
    }
    .el-dialog{
      .myAccount-dialog1-title{
        border-bottom: 1px solid #ddd;
        height: 105px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 50px;
        h1{
          font-size: 24px;
          font-weight: 400;
          margin: 0;
        }
        span{
          color: #FF181D;
          cursor: pointer;
        }
      }
      .myAccount-dialog1-content{
        .el-form{
          padding: 0 50px 50px;
          &-item{
            margin-top: 20px;
            width: 483px;
            &__label{
              color: #aaa;
              font-weight: 400;
              font-size: 18px;
            }
            .el-input{
              input{
                width: 483px;
              }
            }
            .el-select{
              // width: 100%
            }
            .code{
             display: flex;
             width: 100%;
             align-items: center;
             .el-input{
               flex:1;
               input{
                 width: 100%
               }
             }
             span{
               cursor:pointer;
               padding: 0 20px;
             }
           }
          }
          .el-button{
          margin-top: 40px;
          width:140px;
          height:54px;
        }
        }
      }
      .myAccount-dialog2-title{
        font-size: 24px;
        height: 105px;
        line-height: 105px;
        font-weight: 400;
        padding-left: 50px;
        border-bottom: 1px solid #ddd;
        margin: 0;
      }
      .myAccount-dialog2-content{
        height: 400px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 24px;
        div{
          text-align: center;
            cursor: pointer;
          img{
            height: 110px;
            width: 110px;
          }
          p{
            margin: 20px 0;
          }
          &:nth-child(1){
            color: #4CA0FF
          }
          &:nth-child(2){
            color: #FFAF4C
          }
        }
      }
      .applyCash-dialog{
        text-align: center;
        height: 260px;
        padding-top: 40px;
        img{

        }
        p{
          margin: 30px 0;
          font-weight: 600
        }
      }
    }
    .bindCard{
      min-height: 940px;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      .el-form{
        padding: 0 50px;
        &-item{
          width: 483px;
            margin-top: 20px;
            &__label{
              color: #aaa;
              font-weight: 400;
              font-size: 18px;
            }
            .el-input{
              input{
                width: 483px;
              }
            }
            .el-select{
              // width: 100%
            }
        }
        p{
          margin-top: 30px;
          font-weight: 600
        }
        .el-button{
          margin-top: 80px;
          width:140px;
          height:54px;
        }
      }
      .applyCash{
        font-size: 12px;
        color: #AEAEAE;
      }
    }
  }
</style>
