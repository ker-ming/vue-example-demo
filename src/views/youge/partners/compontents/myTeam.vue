
<template>
  <div class="team">
    <div class="team-title">
      <h1>我的团队</h1>
      <ul>
        <li>
          <h2>{{ teamInfo.first_num || '0' }}</h2>
          <h5>我的直客总数</h5>
        </li>
        <li>
          <h2>{{ teamInfo.area_num || '0' }}</h2>
          <h5>所属区域合伙人总数</h5>
        </li>
        <li>
          <h2>{{ teamInfo.basic_num || '0' }}</h2>
          <h5>定制定购客户</h5>
        </li>
        <li>
          <h3>我的级别：{{ teamInfo.levelName }}</h3>
          <h4 v-if="teamInfo.levelName != '定制定购'">推荐码：{{ teamInfo.share_code }}</h4>
        </li>
      </ul>
    </div>
    <div class="team-content">
      <div class="team-content-head">
        <span>筛选</span>
        <el-radio-group v-model="teamRadio" @change="teamChangeRadio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">直客</el-radio>
          <el-radio :label="3">区域合伙人</el-radio>
          <el-radio :label="4">区域定制订购</el-radio>
        </el-radio-group>
      </div>
      <el-table
        :data="myTeamData"
        style="width: 100%"
      >
        <el-table-column
          prop="member_id"
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
          prop="create_time"
          label="签约时间"
          align="center"
        />
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
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { validPhone } from '@/utils/validate'

export default {
  name: 'Team',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      teamInfo: {},
      teamRadio: 1,
      start_page: 0,
      total_pages: 0,
      myTeamData: []
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    this.getMyTeam()
    this.getTeamInfo()
  },
  methods: {
    // 单选框
    teamChangeRadio() {
      this.start_page = 0
      this.getMyTeam()
      console.log(1)
    },
    pageChange(data) {
      this.start_page = data - 1
      this.getMyTeam()
    },
    //   获取列表
    getMyTeam() {
      const self = this
      request({
        url: '/hand/hand-api/my-team',
        method: 'post',
        data: {
          token: self.token,
          start_page: self.start_page,
          pages: 10,
          is_all: self.teamRadio == 1 ? 1 : 0,
          is_first: self.teamRadio == 2 ? 1 : 0,
          is_area: self.teamRadio == 3 ? 1 : 0,
          is_basic: self.teamRadio == 4 ? 1 : 0

        }
      }).then(res => {
        this.total_pages = res.data.total_pages - 0
        this.myTeamData = res.data.list
      })
    },
    // 获取团队信息
    getTeamInfo() {
      const self = this
      request({
        url: '/hand/hand-api/team-info',
        method: 'post',
        data: {
          token: self.token
        }
      }).then(res => {
        this.teamInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" >
  .team{
    &-title{
      min-height: 256px;
      margin-bottom: 30px;
      background: #fff;
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      overflow: hidden;
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
        height: 150px;
        li{
          text-align: center;
          h2{
            margin: 0 0 10px;
            font-size: 32px;
          }
          h5{
            font-size: 14px;
            color: #A1A1A1;
          }
          &:nth-child(4){
            width: 300px;
            border-left: 1px solid #C6CFD9;
            text-align: left;
            padding-left: 46px;
            color: #4A4A4A;
            h3{
              margin-bottom: 8px;
              font-size: 18px;
              font-weight: 400;
            }
            h4{
              font-size: 16px;
              font-weight: 400;
            }
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
        // tbody{
        //   tr{
        //     td{
        //       &:nth-child(6){
        //         color:#FF181D
        //       }
        //     }
        //   }
        // }
      }
    }
  }
</style>
