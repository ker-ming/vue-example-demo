
<template>
  <div class="income">
    <div v-if="incomeFlag" class="income-title">
      <h1>我的收益</h1>
      <ul>
        <li>
          <h2>{{ incomeData.total_amount || '0.00' }}</h2>
          <h5>购销总金额(万)</h5>
        </li>
        <li>
          <h2>{{ incomeData.total_income || '0.00' }}</h2>
          <h5>我的总提成(万)</h5>
        </li>
        <li>
          <h2>{{ incomeData.total_balance || '0.00' }}</h2>
          <h5>可提现总金额(万)</h5>
        </li>
        <li>
          <h2>{{ incomeData.total_coin || '0.00' }}</h2>
          <h5>我的总积分(分)</h5>
        </li>
        <li>
          <h2>{{ incomeData.total_hand || '0.00' }}</h2>
          <h5>我的团队总人数</h5>
        </li>
      </ul>
    </div>
    <div v-if="incomeFlag" class="income-content">
      <div class="income-content-head">
        <span>筛选</span>
        <el-radio-group v-model="incomeRadio" @change="incomeChangeRadio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">直客</el-radio>
          <el-radio :label="3">区域合伙人</el-radio>
          <el-radio :label="4">区域定制订购</el-radio>
        </el-radio-group>
      </div>
      <el-table
        :data="incomeData.list"
        style="width: 100%"
      >
        <el-table-column
          prop="uid"
          label="用户ID"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="用户名称"
          align="center"
        />
        <el-table-column
          prop="levelName"
          label="级别"
          align="center"
        />
        <el-table-column
          prop="area"
          label="所属区域"
          align="center"
        />
        <el-table-column
          prop="relation"
          label="关系"
          align="center"
        />
        <el-table-column
          prop="total_income"
          label="贡献提成"
          align="center"
        />
        <el-table-column
          prop="address"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <span @click="getRegister(scope.row.uid)">查看</span>
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
    <div v-if="!incomeFlag" class="income-register-title">
      <div class="income-register-title-head">
        <h1>团队成员收益明细</h1>
        <el-button type="primary" @click="incomeFlag = true">返回</el-button>
      </div>
      <div class="income-register-title-content">
        <img :src="registerData.head_url" alt="">
        <div>
          <h4>{{ registerData.nickname }}</h4>
          <h5>用户ID:{{ registerData.uid }}</h5>
          <h6>{{ registerData.levelName }}-{{ registerData.area }}</h6>
        </div>
      </div>
    </div>
    <div v-if="!incomeFlag" class="income-register-content">
      <el-table
        :data="registerData.list"
        style="width: 100%"
      >
        <el-table-column
          prop="order_no"
          label="订单编号"
          align="center"
        />
        <el-table-column
          prop="create_time"
          label="下单时间"
          align="center"
        />
        <el-table-column
          prop="title"
          label="消费属性"
          align="center"
        />
        <el-table-column
          prop="amount"
          label="销售金额"
          align="center"
        />
        <el-table-column
          prop="price"
          label="提成"
          align="center"
        />
        <el-table-column
          prop="coin"
          label="积分"
          align="center"
        />
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="register_total_pages"
        hide-on-single-page
        :current-page="register_start_page + 1"
        @current-change="registerPageChange"
      />
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Income',
  data() {
    return {
      incomeRadio: 1,
      incomeData: {},
      incomeFlag: true,
      registerData: {},
      start_page: 0,
      total_pages: 0,
      register_total_pages: 0,
      register_start_page: 0,
      member_id: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    this.getincomeData()
  },
  methods: {
    // 切换页数
    pageChange(data) {
      this.start_page = data - 1
      this.getincomeData()
    },
    registerPageChange(data) {
      this.register_start_page = data - 1
      this.getRegisterData()
    },
    // 单选框
    incomeChangeRadio() {
      this.start_page = 0
      this.getincomeData()
    },
    // 收益明细
    getincomeData() {
      const self = this
      request({
        url: '/hand/hand-api/income-list',
        method: 'post',
        data: {
          token: self.token,
          type: self.incomeRadio,
          start_page: self.start_page,
          pages: 10
        }
      }).then(res => {
        this.incomeData = res.data
        this.total_pages = res.data.total_pages - 0
      })
    },
    // 下级产生收益明细
    getRegister(member_id) {
      this.register_start_page = 0
      this.member_id = member_id
      this.getRegisterData()
    },
    getRegisterData() {
      const self = this
      request({
        url: '/api/user/register',
        method: 'post',
        data: {
          token: self.token,
          member_id: self.member_id,
          start_page: self.register_start_page,
          pages: 10
        }
      }).then(res => {
        this.incomeFlag = false
        this.registerData = res.data
        this.register_total_pages = res.data.total_pages
      })
    }
  }
}
</script>

<style lang="scss" >
  .income{
    &-title{
      height: 256px;
      // border-bottom: 30px solid #F6F6F6;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      h1{
        font-size: 32px;
        font-weight: 400;
        line-height: 105px;
        border-bottom: 1px solid #ddd;
        padding-left: 50px;
        margin: 0;
        color: #0C2543;
      }
      ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 120px;
        li{
          text-align: center;
          h2{
            margin: 30px 0 10px;
            font-size: 32px;
          }
          h5{
            font-size: 14px;
            color: #A1A1A1;
          }
        }
      }
    }
    &-content{
      min-height: 654px;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      &-head{
        height: 62px;
        display: flex;
        align-items: center;
        padding-left: 50px;
        border-bottom: 1px solid #ddd;
        >span{
          margin-right: 50px;
        }
      }
      .el-table{
        thead{
          tr{
            height: 62px;
            th{
              color: #000;
              font-size: 16px;
              font-weight: 600
            }
          }
        }
        tbody{
          tr{
            td{
              &:nth-child(6){
                color:#FF181D
              }
            }
          }
        }
      }
    }
    &-register-title{
      height: 256px;
      // border-bottom: 30px solid #F6F6F6;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      &-head{
        height: 105px;
        border-bottom: 1px solid #ddd;
        padding: 0 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1{
          font-weight: 400
        }
      }
      &-content{
        padding: 0 50px;
        display: flex;
        align-items: center;
        height: 120px;
        img{
          height: 73px;
          width: 73px;
          margin-right: 20px;
        }
        div{
          h4{
            font-size: 18px;
          }
          h5{
            color: #4A4A4A;
            font-size: 14px;
            font-weight: 400;
            margin: 5px 0;
          }
          h6{
            color: #FF181D;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
    }
    &-register-content{
      min-height: 654px;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      thead{
        tr{
          height: 62px;
          th{
            color: #000;
            font-size: 16px;
            font-weight: 600
          }
        }
      }
      tbody{
        tr{
          td{
            &:nth-child(5){
              color:#FF181D
            }
          }
        }
      }
    }
  }
</style>
