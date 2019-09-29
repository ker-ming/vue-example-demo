<template>
  <div class="user-header">
    <div class="user-content">
      <template v-if="token">
        <router-link class="user-box" :to="{path: '/personal/1?id=1'}">
          <span>{{ name }}</span>
          <span style="margin-left: 16px;">个人中心</span>
        </router-link>
      </template>
      <template v-else>
        <div class="user-box">
          <span>欢迎来到Token Mall</span>
          <router-link class="theme_font--color" style="margin-left: 16px;" :to="{path: '/login'}">你好，请登陆</router-link>
          <router-link style="margin-left: 16px;" :to="{name: 'register'}">免费注册</router-link>
        </div>
      </template>
      <div class="cart">
        <router-link :to="{ path: '/personal/3?id=1' }">我的订单</router-link>
        <router-link :to="{ path: '/personal/4?id=1' }">预购单</router-link>
        <router-link :to="{ name: 'cart' }">购物车</router-link>
        <span style="margin:0 10px;cursor:pointer" @click="service">客服</span>
        <router-link :to="{ path: '/personal/2?id=1' }">我的钱包</router-link>
      </div>
    </div>
    <el-dialog id="completeDialog" title="" :visible.sync="dialogComplete" width="80%" top="15px">
      <div id="completeDiv">
        <iframe :src="url" height="500" width="100%" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'

export default {
  data() {
    return {
      dialogComplete: false,
      url: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token',
      'shop_id'
    ])
  },
  methods: {
    service() {
      const self = this
      request({
        url: '/customer/index-api/token-by-shop-id',
        method: 'post',
        data: {
          token: self.token,
          type: '0'
        }
      }).then(res => {
        const robot = res.data
        const url = 'https://www.sobot.com/chat/pc/index.html?sysNum=dedfdc70393b47aab9ba4f5f8287d3a2' +
        '&aid=' + robot.transferAction.deciId +
        '&uname=' + self.nickname +
        '&titleFlag=2&customTitle=农拍网' +
        '&tel=' + self.phone
        window.open(url, '_blank')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__title{
  margin-left:15px;
}
.user {
  &-header {
    height: 34px;
    font-size: 9px;
    color: #555555;
    line-height: 34px;
    background: rgba(240,245,241,1);
  }
  &-box {
    float: left;
  }
  &-content {
    width: 1180px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.cart {
  float: right;
  a+a {
    margin-left: 16px;
  }
}
</style>
