
<template>
  <div class="scores">
    <div class="scores-title">
      <h1>我的积分</h1>
      <div>
        <h2>{{ coin }}</h2>
        <span>结余可用积分</span>
      </div>
    </div>
    <div class="scores-content">
      <el-table
        :data="coinList"
        style="width: 100%"
      >
        <el-table-column
          prop="create_time"
          label="时间"
          align="center"
        />
        <el-table-column
          prop="order_no"
          label="流水号"
          align="center"
        />
        <el-table-column
          prop="title"
          label="类型"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.is_add == 0">购销抵扣</span>
            <span v-if="scope.row.is_add == 1">购销奖励</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="coin"
          label="积分"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.is_add == 0" style="color: #FF181D">-{{ scope.row.coin }}</span>
            <span v-if="scope.row.is_add == 1" style="color: #20BA47">+{{ scope.row.coin }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_pages"
        hide-on-single-page
        :current-page="start_page+ 1"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Scores',
  data() {
    return {
      coin: 0,
      scoresData: [],
      start_page: 0,
      total_pages: 0,
      coinList: []

    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    this.getMyCoin()
  },
  methods: {

    // 切换页数
    pageChange(data) {
      this.start_page = data - 1
      this.getMyCoinList()
    },
    //   获取我的积分
    getMyCoin() {
      const self = this
      request({
        url: '/member/user-coin-api/get-my-coin',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.coin = res.data.coin
      })
    },
    //   获取我的积分明细
    getMyCoinList() {
      const self = this
      request({
        url: 'member/user-coin-api/get-coin-list',
        method: 'post',
        data: {
          token: self.token,
          start_page: self.start_page,
          pages: 10
        }
      }).then(res => {
        this.coinList = res.data.list
        this.total_pages = res.data.total_pages - 0
      })
    }
  }
}
</script>

<style lang="scss" >
  .scores{
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
      div{
        height: 150px;
        padding-left: 50px;
        display: flex;
        align-items: center;
        h2{
          font-size: 32px;
          margin-right: 10px;
        }
        span{
          font-size: 14px;
          color: #A1A1A1;
        }
      }
    }
    &-content{
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
    }
  }
</style>
