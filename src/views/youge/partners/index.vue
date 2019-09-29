<template>
  <div class="partners">
    <ul class="partners-nav">
      <p>合伙人中心</p>
      <li :class="index === 1? 'pNavLiActive': ''" @click="jumpCom(1)">
        <img src="@/assets/yImg/h1.png" alt="">
        <span>基础资料</span>
      </li>
      <li :class="index === 2? 'pNavLiActive': ''" @click="jumpCom(2)">
        <img src="@/assets/yImg/h2.png" alt="">
        <span>收货地址</span>
      </li>
      <li :class="index === 3? 'pNavLiActive': ''" @click="jumpCom(3)">
        <img src="@/assets/yImg/h3.png" alt="">
        <span>我的账户</span>
      </li>
      <li :class="index === 4? 'pNavLiActive': ''" @click="jumpCom(4)">
        <img src="@/assets/yImg/h4.png" alt="">
        <span>我的收益</span>
      </li>
      <li :class="index === 5? 'pNavLiActive': ''" @click="jumpCom(5)">
        <img src="@/assets/yImg/h5.png" alt="">
        <span>我的积分</span>
      </li>
      <li :class="index === 6? 'pNavLiActive': ''" @click="jumpCom(6)">
        <img src="@/assets/yImg/h6.png" alt="">
        <span>我的团队</span>
      </li>
      <li :class="index === 7? 'pNavLiActive': ''" @click="jumpCom(7)">
        <img src="@/assets/yImg/h7.png" alt="">
        <span>我的云仓</span>
      </li>
      <ol :class="index === 7 ? 'pNavOl': ''">
        <li :class="pNavOlIndex === 1? 'pNavOlActive': ''" @click="jumpCom(7,1)">我的库存</li>
        <li :class="pNavOlIndex === 2? 'pNavOlActive': ''" @click="jumpCom(7,2)">申请出库</li>
        <li :class="pNavOlIndex === 3? 'pNavOlActive': ''" @click="jumpCom(7,3)">订单入库</li>
        <li :class="pNavOlIndex === 4? 'pNavOlActive': ''" @click="jumpCom(7,4)">订单跟踪</li>
      </ol>
    </ul>
    <div class="partners-content">
      <div v-if="!index" class="bg_url">
        <img :src="bg_url" alt="">
      </div>
      <UserData v-if="index === 1" />
      <Address v-if="index === 2" />
      <MyAccount v-if="index === 3" />
      <MyIncome v-if="index === 4" />
      <MyScores v-if="index === 5" />
      <MyTeam v-if="index === 6" />
      <MyCloudValley v-if="index === 7" :cloud-valley-id="pNavOlIndex" @partnersJump="partnersJump" />
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import UserData from './compontents/userData'
import Address from './compontents/address'
import MyAccount from './compontents/myAccount'
import MyIncome from './compontents/myIncome'
import MyScores from './compontents/myScores'
import MyTeam from './compontents/myTeam'
import MyCloudValley from './compontents/myCloudValley'

export default {
  name: 'Partners',
  components: {
    UserData,
    Address,
    MyAccount,
    MyIncome,
    MyScores,
    MyTeam,
    MyCloudValley
  },
  data() {
    return {
      index: 1,
      pNavOlIndex: 1,
      bg_url: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    const self = this
    this.index = this.$route.query.pIndex - 0
    this.pNavOlIndex = this.$route.query.pNavOlIndex - 0 || 1
    request({
      url: '/hand/hand-api/hand-bg',
      method: 'post',
      data: {
        token: self.token
      }
    }).then(res => {
      this.bg_url = res.data.bg_url
    })
  },
  methods: {
    partnersJump(index) {
      if (index == 1) {
        this.pNavOlIndex = 1
        this.$router.push({ path: '/partners', query: { pIndex: 7, key: 3, pNavOlIndex: 1 }})
      } else if (index == 2) {
        this.index = 2
        this.$router.push({ path: '/partners', query: { pIndex: 2, key: 3, pNavOlIndex: 1 }})
      }
    },
    jumpCom(index, pNavOlIndex) {
      this.pNavOlIndex = pNavOlIndex || 1
      this.index = index
      this.$router.push({ path: '/partners', query: { pIndex: index, key: 3, pNavOlIndex }})
    }
  }
}
</script>

<style lang="scss" >
  .partners{
    width: 1200px;
    margin: 30px auto 100px;
    display: flex;
    &-nav{
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      width: 300px;
      background: #fff;
      border-radius: 5px;
      height: 940px;
      margin-right: 30px;
      p{
        height: 97px;
        line-height: 97px;
        border: 1px solid #eee;
        text-align: center;
        font-weight: 600;
      }
      li{
        cursor: pointer;
        font-weight: 600;
        height: 56px;
        opacity: 0.4;
        padding-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        span{
          display: block;
          height: 20px;
          line-height: 20px;
        }
        &:hover{
          opacity: 0.8;
        }
      }
      ol{
        overflow: hidden;
        transition: 0.8s;
        height: 0px;
        background: #F6F6F6;
        .pNavOlActive{
          background: #C8C8C8;
          opacity: 1;
        }
      }
      .pNavOl{
        height: 224px;
      }
      .pNavLiActive{
        opacity: 1;
      }
    }
    &-content{
      // box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      width: 100%;
      // height: 940px;
      // background: #fff;
      .bg_url{
        width: 100%;
        img{
          width: 100%;
        }
        box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
        height: 940px;
        background: #fff;
        padding: 40px 20px;
      }
    }
    .el-pagination{
      margin: 20px 0;
    }
  }
</style>
