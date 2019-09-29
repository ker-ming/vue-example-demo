<template>
  <div class="login">
    <div class="login-text">
      <el-badge :value="all_no_readnum" class="item">
        <i class="el-icon-chat-dot-square" @click="goNewsList" />
      </el-badge>
      <span v-if="!token" @click="goLogin">登录/注册</span>
      <span v-else @click="Logout">退出登录</span>
    </div>
    <el-dialog title="" :show-close="false" width="50vw" top="10vh" :visible.sync="dialogTableVisible">
      <div>
        <div class="title">
          <p class="title-1">{{ title }}</p>
          <p v-if="flag === 2 || flag === 3" class="title-2" @click="clickBtn(1)">
            <i class="el-icon-arrow-left" />
            <span>返回登录</span>
          </p>
          <p v-if="flag === 4 || flag === 5" class="title-2" @click="flag--">
            <i class="el-icon-arrow-left" />
            <span>返回上级</span>
          </p>
        </div>
        <div v-if="flag === 1" class="change">
          <span :class="way === 1 ? 'loginactive': ''" @click="loginWay(1)">密码登录</span>
          <span :class="way === 2 ? 'loginactive': ''" @click="loginWay(2)">验证码登录</span>
        </div>
        <el-form v-if="flag === 1" ref="loginForm1" :model="loginForm1" :rules="loginRules1" label-position="left">

          <el-form-item prop="phone">
            <p>登录账号</p>
            <el-input v-model="loginForm1.phone" maxlength="11" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item v-if="way === 1" prop="password">
            <p>登录密码</p>
            <el-input v-model="loginForm1.password" type="password" placeholder="请输入密码" @keyup.enter.native="clickLogin(1)" />
          </el-form-item>
          <span v-if="way === 1" class="forgetpassword" @click="clickBtn(2)">忘记密码</span>
          <el-form-item v-if="way === 2" prop="code">
            <p>验证码</p>
            <div class="code">
              <el-input v-model="loginForm1.code" placeholder="请入输验证码" />
              <span @click="getNavCode(0)">{{ titleCode[0] }}</span>
            </div>
          </el-form-item>
          <el-button type="danger" class="login-1" @click="clickLogin(1)">登录</el-button>
          <!-- <b /> -->
          <!-- <p class="logonText">没有账号？点击下方注册</p> -->
          <el-button type="danger" class="logon" @click="clickBtn(3)">点击注册</el-button>
        </el-form>
        <el-form v-if="flag === 2" ref="loginForm2" :model="loginForm2" :rules="loginRules2" label-position="left">

          <el-form-item prop="phone">
            <p>手机号</p>
            <el-input v-model="loginForm2.phone" maxlength="11" placeholder="请输入账号" />
          </el-form-item>

          <el-form-item prop="code">
            <p>验证码</p>
            <div class="code">
              <el-input v-model="loginForm2.code" type="password" placeholder="请入输验证码" />
              <span @click="getNavCode(1)">{{ titleCode[1] }}</span>
            </div>
          </el-form-item>

          <el-form-item v-if="way === 1" prop="password">
            <p>密码</p>
            <el-input v-model="loginForm2.password" type="password" placeholder="设置新的密码" />
          </el-form-item>
          <el-form-item v-if="way === 1" prop="newpassword">
            <el-input v-model="loginForm2.newpassword" type="password" placeholder="重复确认密码" class="newpassword" />
          </el-form-item>
          <el-button type="danger" class="loginBtn" @click="clickLogin(2)">登录</el-button>
        </el-form>

        <el-form v-if="flag === 3" ref="loginForm3" :model="loginForm3" :rules="loginRules3" label-position="left">
          <el-form-item prop="username">
            <p>昵称</p>
            <el-input v-model="loginForm3.username" placeholder="请输入您的昵称" />
          </el-form-item>
          <el-form-item prop="provinces">
            <p>省市区</p>
            <el-cascader v-model="loginForm3.provinces" :props="props" />
          </el-form-item>
          <el-form-item prop="phone">
            <p>手机号</p>
            <el-input v-model="loginForm3.phone" maxlength="11" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item prop="code">
            <p>验证码</p>
            <div class="code">
              <el-input v-model="loginForm3.code" type="password" placeholder="请输入验证码" />
              <span @click="getNavCode(2)">{{ titleCode[2] }}</span>
            </div>
          </el-form-item>
          <el-button type="danger" class="loginBtn" @click="clickBtn(4)">下一步</el-button>
        </el-form>
        <el-form v-if="flag === 4" ref="loginForm3" :model="loginForm3" :rules="loginRules3" label-position="left">
          <el-form-item prop="password">
            <p>密码</p>
            <el-input v-model="loginForm3.password" type="password" placeholder="设置新的密码" />
          </el-form-item>
          <el-form-item prop="newpassword">
            <el-input v-model="loginForm3.newpassword" type="password" placeholder="重复确认密码" class="newpassword" />
          </el-form-item>
          <el-form-item prop="invitation_code">
            <p>邀请码</p>
            <el-input v-model="loginForm3.invitation_code" placeholder="请输入邀请码（选填）" />
          </el-form-item>
          <el-button type="danger" class="loginBtn" @click="clickLogin(3)">完成注册</el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { setInterval, clearInterval } from 'timers'
import { validPhone } from '@/utils/validate'
import md5 from 'js-md5'

export default {
  name: 'LoginBtn',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
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
      if (this.loginForm2.password !== this.loginForm2.newpassword || this.loginForm3.password !== this.loginForm3.newpassword) {
        callback(new Error('两次密码输入不同'))
      } else {
        callback()
      }
    }
    return {
      all_no_readnum: 0,
      way: 1,
      dialogTableVisible: false,
      flag: 1,
      title: '欢迎登录',
      titleCode: ['点击获取', '点击获取', '点击获取'],
      timer: ['', '', ''],
      num: [60, 60, 60],
      loginRules1: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loginRules2: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newpassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loginRules3: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        provinces: [{ required: true, trigger: 'change', message: '请填写省市区' }],
        username: [{ required: true, trigger: 'blur', message: '请填写昵称' }],
        newpassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }]
      },
      loginForm1: {
        phone: '',
        password: '',
        code: ''
      },
      loginForm2: {
        phone: '',
        password: '',
        newpassword: '',
        code: ''
      },
      loginForm3: {
        username: '',
        phone: '',
        password: '',
        newpassword: '',
        code: '',
        invitation_code: '',
        provinces: ''
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { value } = node
          console.log(node, resolve)
          request({
            url: '/base/district-api/index',
            method: 'post',
            data: {
              upid: value || 0,
              data_type: 0
            }
          }).then(res => {
            const nodes = res.data.map(item => ({
              value: item.id,
              label: item.name,
              leaf: item.level >= 3
            }))
            resolve(nodes)
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id',
      'phone'
    ])
  },
  created() {
    if (this.token) {
      this.unreadMessage()
    }
  },
  methods: {
    // 未读消息
    unreadMessage() {
      const self = this
      request({
        url: '/notice/notice-api/get-num',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.all_no_readnum = res.data.all_no_readnum
      })
    },
    goNewsList() {
      this.$router.push({ path: '/newsList' })
    },
    // 退出登录
    Logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$message({
          message: '退出登录成功',
          type: 'success',
          showClose: true
        })
      })
    },
    // 登录方式
    loginWay(index) {
      this.way = index
      this.clearForm()
      this.$nextTick(() => {
        this.$refs.loginForm1.resetFields() // this.$refs.adduserform.resetFields();
      })
    },
    // 忘记密码
    clickBtn(index) {
      if (index === 1) {
        this.title = '欢迎登录'
        this.clearForm()
        this.$nextTick(() => {
          this.$refs.loginForm1.resetFields() // this.$refs.adduserform.resetFields();
        })
      } else if (index === 2) {
        this.title = '重设密码'
        this.clearForm()
        this.$nextTick(() => {
          this.$refs.loginForm2.resetFields() // this.$refs.adduserform.resetFields();
        })
      } else if (index === 3) {
        this.title = '注册账号'
        this.$nextTick(() => {
          this.$refs.loginForm3.resetFields() // this.$refs.adduserform.resetFields();
        })
      } else if (index === 4) {
        this.$refs.loginForm3.validate(valid => {
          if (valid) {
            this.title = '设置密码'
            this.$nextTick(() => {
              this.$refs.loginForm3.resetFields() // this.$refs.adduserform.resetFields();
            })
          } else {
            index = 3
            return false
          }
        })
      }
      this.flag = index
    },
    // 清空表单
    clearForm() {
      this.aginNavCode()
      this.loginForm1 = {
        phone: '',
        password: '',
        code: ''
      }
      this.loginForm2 = {
        phone: '',
        password: '',
        newpassword: '',
        code: ''
      }
      this.loginForm3 = {
        username: '',
        phone: '',
        password: '',
        newpassword: '',
        code: '',
        invitation_code: '',
        provinces: ''
      }
    },
    // 登录注册
    goLogin() {
      this.way = 1
      this.dialogTableVisible = true
      this.clickBtn(1)
    },
    // 登录
    clickLogin(index) {
      const self = this
      let data = {}
      if (index === 1) {
        if (this.way === 1) {
          data = {
            scenario: 'login_phone',
            phone: this.loginForm1.phone,
            password: md5(this.loginForm1.password)
          }
        } else if (this.way === 2) {
          data = {
            scenario: 'login_code',
            phone: this.loginForm1.phone,
            code: this.loginForm1.code
          }
        }
        this.$refs.loginForm1.validate(valid => {
          if (valid) {
            this.$store.dispatch('user/login', data).then(() => {
              this.$router.push({ path: '/partners', query: { key: 3 }})
              this.dialogTableVisible = false
              this.$message({
                message: '登录成功',
                type: 'success',
                showClose: true
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (index === 2) {
        this.$refs.loginForm2.validate(valid => {
          if (valid) {
            request({
              url: '/member/user-api/reset-password',
              method: 'post',
              data: {
                password: md5(self.loginForm2.password),
                code: self.loginForm2.code,
                phone: self.loginForm2.phone
              }
            }).then(res => {
              this.dialogTableVisible = false
              this.$message({
                message: '重设密码成功',
                type: 'success',
                showClose: true
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (index === 3) {
        // 注册
        this.$refs.loginForm3.validate(valid => {
          if (valid) {
            request({
              url: '/member/user-api/register',
              method: 'post',
              data: {
                password: md5(self.loginForm3.password),
                code: self.loginForm3.code,
                username: self.loginForm3.username,
                invitation_code: self.loginForm3.invitation_code,
                p_id: self.loginForm3.provinces[0],
                c_id: self.loginForm3.provinces[1],
                d_id: self.loginForm3.provinces[2],
                phone: self.loginForm3.phone,
                scenario: 'register_default'
              }
            }).then(res => {
              this.$message({
                message: '注册成功，请登录账号',
                type: 'success',
                showClose: true
              })
              this.clickBtn(1)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 重置验证码
    aginNavCode() {
      this.num.map((item, index) => {
        this.titleCode.splice(index, 1, '点击获取')
        this.num[index] = 60
        clearInterval(this.timer[index])
      })
    },
    // 获取验证码
    getNavCode(index) {
      const self = this
      let phone = ''
      let type = ''
      if (index === 0) {
        phone = this.loginForm1.phone
        type = 'login'
      } else if (index === 1) {
        phone = this.loginForm2.phone
        type = 'reset'
      } else if (index === 2) {
        phone = this.loginForm3.phone
        type = 'register'
      }
      if (this.num[index] !== 60) return
      if (!phone) {
        this.$message({
          message: '请填写手机号',
          type: 'warning',
          showClose: true
        })
        return
      }
      request({
        url: '/member/user-api/send-sms',
        method: 'post',
        data: {
          phone,
          type
        }
      }).then(() => {
        this.$message({
          message: '验证码已发送',
          type: 'success',
          showClose: true
        })
        this.timer[index] = setInterval(function() {
          self.num[index]--
          if (self.num[index] <= 0) {
            self.titleCode.splice(index, 1, '点击获取')
            self.num[index] = 60
            clearInterval(self.timer[index])
          } else {
            self.titleCode.splice(index, 1, self.num[index] + '秒后再次获取')
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss">
.login{
  .login-text{
    color: #fff;
    position: relative;
    z-index: 100;
    // width: 150px;
    span{
     margin-left:20px;
     font-size: 14px;
     cursor: pointer;
    }
    i{
      font-size: 22px;
    }
  }
  .el-dialog{
    border-radius: 5px;
    overflow: hidden;
    // height: 80%;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
     padding: 0;
     display: flex;
     >div{
       width: 100%;
       padding: 30px 20px;
       text-align: center;
       .title{
         margin-bottom: 35px;
         line-height: 28px;
         height: 28px;
         position: relative;
         p{
           width: 100%;
         }
         &-1{
           margin: 0;
           font-size: 28px;
           color: #0C2543;
           font-weight: 100;
           text-align: center;
         }
         &-2{
           float:right;
           margin: 0;
           cursor: pointer;
           text-align: end;
           position: absolute;
           right: 0;
           top: 0;
         }
       }
       .change{
         font-size: 18px;
         color: #bbb;
         cursor: pointer;
         span{
           margin-right: 10px;
         }
       }
       .loginactive{
         font-size: 22px;
         color: #000;
       }
       .el-form{
         margin-top: 40px;
         display: flex;
         flex-direction: column;
         align-items: center;
         .forgetpassword{
            text-align: end;
            cursor: pointer;
            margin-bottom: 30px;
            width: 480px;
            display: block;
         }
         &-item{
           width: 480px;
           text-align:initial;
           p{
            margin: 0;
            font-size: 14px;
            line-height: 25px;
           }
           .code{
             display: flex;
             .el-input{
               flex:1
             }
             span{
               cursor:pointer;
               padding: 0 20px;
             }
           }
           .newpassword{
            //  margin-top: 20px;
           }
           .el-cascader{
             width: 100%;
           }
         }
         .loginBtn{
           margin: 40px 0 40px;
         }
         .el-button{
          //  width: 100%;
           width: 480px;
           height: 54px;
           background: #FF181D;
         }
         b{
           width: 100%;
           height: 1px;
           background: #bbb;
           display: block;
           margin: 20px 0;
         }
         .logonText{
           text-align: center;
           color: #bbb
         }
         .login-1{
           margin-top: 20px
         }
         .logon{
           text-align: center;
           color: #FF181D;
           margin: 110px 0 40px;
           background: #FFFAFA;
           font-weight: 600;
         }
       }
     }
    }
  }
}
</style>
