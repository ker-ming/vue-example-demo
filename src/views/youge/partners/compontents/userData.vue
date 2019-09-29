<template>
  <div class="userData">
    <h1>基础资料</h1>
    <el-form class="userData-form">
      <el-form-item>
        <p>当前头像</p>
        <div class="content">
          <el-upload
            class="avatar-uploader"
            action="/material/index/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.head_url" :src="userForm.head_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span @click="setData(1)">保存</span>
        </div>
      </el-form-item>
      <el-form-item>
        <p>名称</p>
        <div class="content">
          <el-input v-model="userForm.nickname" />
          <span @click="setData(2)">保存</span>
        </div>
      </el-form-item>
      <el-form-item>
        <p>地区</p>
        <h2>{{ userForm.area }}</h2>
      </el-form-item>
      <el-form-item>
        <p>手机号</p>
        <div class="content">
          <h2>{{ userForm.phone }}</h2>
          <span @click="userModify">修改</span>
        </div>
      </el-form-item>
      <el-form-item v-if="level != '定制定购'">
        <p v-if="userForm.is_invited != 1">补录上级</p>
        <p v-else>上级邀请码</p>
        <div class="content">
          <el-input v-model="userForm.up_share_code" :disabled="userForm.is_invited == 1" />
          <span v-if="userForm.is_invited != 1" @click="setRecord">保存</span>
        </div>
      </el-form-item>
      <!-- <el-form-item>
        <p>支付密码</p>
        <span>点击设置</span>
      </el-form-item> -->
    </el-form>
    <el-dialog title="" :show-close="false" width="50%" top="4%" :visible.sync="dialogTableVisible">
      <div class="userDialogTitle">
        <h2>修改手机号码</h2>
        <span @click="dialogTableVisible = false">取消</span>
      </div>
      <el-form ref="userphoneForm" :model="userphoneForm" :rules="userphoneRules">
        <el-form-item>
          <p>手机号</p>
          <el-input v-model="userphoneForm.phone" maxlength="11" disabled />
        </el-form-item>
        <el-form-item prop="newphone">
          <p>新手机号</p>
          <el-input v-model="userphoneForm.newphone" maxlength="11" placeholder="请输入新手机号" />
        </el-form-item>
        <el-form-item prop="code">
          <p>验证码</p>
          <div class="code">
            <el-input v-model="userphoneForm.code" placeholder="请入输验证码" />
            <span @click="getCode">{{ titleCode }}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userSave">确认</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { validPhone } from '@/utils/validate'

export default {
  name: 'UserData',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: false,
      record: '',
      code: '',
      titleCode: '点击获取',
      timer: '',
      num: 60,
      userForm: {
        head_url: '',
        nickname: '',
        area: '',
        phone: ''
      },
      userphoneForm: {
        phone: '',
        code: '',
        newphone: ''
      },
      userphoneRules: {
        newphone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id',
      'level'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    //   修改
    userModify() {
      this.dialogTableVisible = true
      this.userphoneForm = {}
      this.userphoneForm.phone = this.userForm.phone
      this.$refs.userphoneForm.resetFields()
    },
    userSave() {
      const self = this
      this.$refs.userphoneForm.validate(valid => {
        if (valid) {
          request({
            url: '/member/user-api/change-phone',
            method: 'post',
            data: {
              token: self.token,
              phone: self.userphoneForm.newphone,
              code: self.userphoneForm.code
            }
          }).then(res => {
            this.dialogTableVisible = false
            this.$message({
              message: '手机号更换成功',
              type: 'success',
              showClose: true
            })
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取验证码
    getCode(index) {
      const self = this
      if (!this.userphoneForm.newphone) {
        this.$message({
          message: '请填写新的手机号',
          type: 'warning',
          showClose: true
        })
        return
      }
      request({
        url: '/member/user-api/send-sms',
        method: 'post',
        data: {
          phone: self.userphoneForm.newphone,
          type: 'changePhone'
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
            self.titleCode = '点击获取'
            self.num = 60
            clearInterval(self.timer)
          } else {
            self.titleCode = self.num + '秒后再次获取'
          }
        }, 1000)
      })
    },
    // 补录上级
    setRecord() {
      const self = this
      request({
        url: '/member/user-api/record',
        method: 'post',
        data: {
          token: self.token,
          invitation_code: self.userForm.up_share_code
        }
      }).then(res => {
        this.getList()
        this.$message({
          type: 'success',
          message: '补录上级成功!',
          showClose: true
        })
      })
    },
    //   修改
    setData() {
      if (!this.userForm.nickname) {
        this.$message({
          type: 'warning',
          message: '名称不能为空!',
          showClose: true
        })
        return
      }
      const self = this
      request({
        url: '/member/user-api/update',
        method: 'post',
        data: {
          token: self.token,
          head_url: self.userForm.head_url,
          nickname: self.userForm.nickname
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功!',
          showClose: true
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.userForm.head_url = file.response.data.url
    },
    beforeAvatarUpload(file) {
    },
    //   获取用户信息
    getList() {
      const self = this
      request({
        url: '/member/user-api/info',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.userForm = res.data
      })
    }

  }
}
</script>

<style lang="scss" >
  .userData{
    min-height: 940px;
    margin-bottom: 30px;
    background: #fff;
    box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
    h1{
        margin: 0;
        padding-left: 50px;
        height: 105px;
        line-height: 105px;
        font-weight: 400;
        font-size: 32px;
        border-bottom: 1px solid #aaa;
    }
    .el-dialog{
        overflow: auto;
        height: 80%;
       .userDialogTitle{
           height: 105px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 0 50px;
           border-bottom: 1px solid #ddd;
           h2{
               font-size: 32px;
               color: #000;
           }
           span{
               font-size: 14px;
               color: #FF181D;
               cursor: pointer;
           }

       }
       .el-form{
             padding: 10px 50px 0;
             &-item{
                 width: 60%;
                //  margin: 0;
                 p{
                     font-size: 16px;
                     line-height: 50px;
                 }
                 h2{
                     font-weight: 400;
                     font-size: 16px;
                     color: #4A4A4A
                 }
                 .code{
                     display: flex;
                     align-items: center;
                     span{
                         cursor: pointer;
                         padding: 0 20px;
                     }
                     .el-input{
                         flex: 1
                     }
                 }
             }
             .el-button{
                 margin-top: 20px;
             }
        }
    }
    &-form{
        padding: 30px 50px 0;
        .el-form-item{
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
            margin: 0;
            p{
                font-size: 16px;
                font-weight: 600;
                line-height: 50px;
            }
            h2{
                font-weight: 400;
                font-size: 16px;
                color: #4A4A4A
            }
            .avatar-uploader{
                height: 80px;
                width: 80px;
                .el-upload{
                    height: 80px;
                    width: 80px;
                    i{
                        height: 80px;
                        width: 80px;
                    }
                    img{
                        height: 80px;
                        width: 80px;
                    }
                }
            }
            .el-input{
                width: 240px;
            }
            .content{
                display: flex;
                align-items: center;
                span{
                    margin-left: 40px;
                }
            }
            span{
                color: #FF181D;
                cursor: pointer;
            }
        }
        .el-button{
            margin-top: 50px;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
  }
</style>
