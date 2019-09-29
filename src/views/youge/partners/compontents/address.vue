<template>
  <div class="myaddress">
    <div class="myaddress-title">
      <span>收货地址</span>
      <el-button type="danger" @click="getNewAddress">创建</el-button>
    </div>
    <el-table
      :data="addressList"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="收货人"
        width="180"
        align="center"
      />
      <el-table-column
        prop="area"
        label="省市区"
        width="180"
        align="center"
      />
      <el-table-column
        prop="address"
        label="详细地址"
        align="center"
      />
      <el-table-column
        prop="tel"
        label="手机号码"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <span @click="modify(scope.row)">修改</span>
          <el-divider direction="vertical" />
          <span class="delect" @click="delect(scope.row.maid)">删除</span>
          <el-divider direction="vertical" />
          <el-button v-if="scope.row.is_top == 1" size="mini" type="primary" disabled>默认</el-button>
          <span v-if="scope.row.is_top != 1" @click="setAddress(scope.row.maid)">设为默认</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="600px"
      :show-close="false"
      @close="handleClose"
    >
      <div class="myaddress-dialog-title">
        <span>{{ addressTitle }}</span>
        <span @click="clearForm">取消</span>
      </div>
      <el-form ref="addressForm" :model="addressForm" :rules="addressRules" label-width="80px">
        <el-form-item prop="name">
          <span>收货人姓名</span>
          <el-input v-model="addressForm.name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item prop="tel">
          <span>手机号码</span>
          <el-input v-model="addressForm.tel" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item prop="provinces">
          <span>省市区</span>
          <el-cascader v-model="addressForm.provinces" :props="props" placeholder="请输入省市区" />
        </el-form-item>
        <el-form-item prop="address">
          <span>详细地址</span>
          <el-input v-model="addressForm.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addressForm.is_top">设置为默认地址</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
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
  name: 'MyAddress',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      addressTitle: '创建地址',
      addressflag: 1,
      addressList: [],
      addressForm: {
      },
      addressRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入收货人姓名' }],
        provinces: [{ required: true, trigger: 'blur', message: '请输入省市区' }],
        tel: [{ required: true, trigger: 'blur', validator: validatePhone }],
        address: [{ required: true, trigger: 'blur', message: '请输入详细地址' }]
      },
      checked: true,
      total_pages: 0,
      dialogVisible: false,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { value } = node
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
      'shop_id'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    //   获取列表
    getList() {
      const self = this
      request({
        url: '/shop/me-address-api/index',
        method: 'post',
        data: {
          token: self.token,
          start_page: 0,
          pages: 20
        }
      }).then(res => {
        this.total_pages = res.data.total_pages - 0
        this.addressList = res.data.list.map((item, index) => {
          const area = item.full_name.split(' ')[0]
          let is_top = true
          if (item.is_top == 0) {
            is_top = false
          } else {
            is_top = true
          }
          return {
            ...item,
            area,
            is_top,
            provinces: [item.p_id, item.c_id, item.d_id]
          }
        })
      })
    },
    // 新建地址
    getNewAddress() {
      if (this.total_pages >= 20) {
        this.$message({
          message: '最多只能添加20个地址',
          type: 'warning',
          showClose: true
        })
        return
      }
      this.dialogVisible = true
      this.addressflag = 1
      this.addressTitle = '新增地址'
    },
    // 保存
    save() {
      const self = this
      let is_top = true
      let url = ''
      let title = ''
      if (this.addressForm.is_top) {
        is_top = 1
      } else {
        is_top = 0
      }
      if (this.addressflag === 1) {
        url = '/shop/me-address-api/create'
        title = '新增地址成功'
      } else if (this.addressflag === 2) {
        url = '/shop/me-address-api/update'
        title = '修改地址成功'
      }
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          request({
            url,
            method: 'post',
            data: {
              token: self.token,
              name: self.addressForm.name,
              p_id: self.addressForm.provinces[0],
              c_id: self.addressForm.provinces[1],
              d_id: self.addressForm.provinces[2],
              tel: self.addressForm.tel,
              address: self.addressForm.address,
              maid: self.addressForm.maid,
              is_top
            }
          }).then(res => {
            this.$message({
              message: title,
              type: 'success',
              showClose: true
            })
            this.clearForm()
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose() {
      this.clearForm()
    },
    // 清空列表
    clearForm() {
      this.addressForm = {
        name: '',
        provinces: '',
        tel: '',
        maid: '',
        address: '',
        is_top: true
      }
      this.dialogVisible = false
      // this.$nextTick(() => {
      this.$refs.addressForm.resetFields()
      // })
    },
    // 修改
    modify(data) {
      this.dialogVisible = true
      this.addressForm = {
        name: data.name,
        provinces: data.provinces,
        tel: data.tel,
        address: data.address,
        is_top: data.is_top,
        maid: data.maid
      }
      this.addressflag = 2
      this.addressTitle = '修改地址'
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
    },
    // 设为默认地址
    setAddress(maid) {
      const self = this
      this.$confirm('是否设置为默认地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/shop/me-address-api/update',
          method: 'post',
          data: {
            token: self.token,
            maid,
            is_top: 1
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!',
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
  .myaddress{
      min-height: 940px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      &-title{
          height: 109px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px 0 50px;
          border-bottom: 1px solid #eee;
          span{
              font-size: 32px;
          }
          .el-button{
              background: #FF181D;
              width: 140px;
              height: 54px;
              span{
                  font-size: 18px;
              }
          }
      }
      .el-table{
        td{
          span{
            cursor: pointer;
          }
          .delect{
            color: #FF181D
          }
        }
      }
      .el-dialog{
          height: 783px;
          margin-bottom: 100px;
          .myaddress-dialog-title{
              padding: 0 50px ;
              margin-bottom: 30px;
              height: 105px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #eee;
              span:nth-child(1){
                  font-size: 32px;
              }
              span:nth-child(2){
                  font-size: 14px;
                  color: #FF181D;
                  cursor: pointer;
              }
          }
          .el-form{
              &-item{
                  &__content{
                      margin-left: 50px !important;
                      font-size: 18px;
                      color: #888;
                      >span{
                          display: block;
                      }
                      .el-input{
                          width: 500px;
                      }
                      .el-button{
                        width: 140px;
                        height: 54px;
                      }
                  }
              }
          }
      }
  }
</style>
