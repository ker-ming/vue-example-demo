<template>
  <div class="app-wrapper">
    <div class="layout-box">
      <div class="layout">
        <img src="@/assets/yImg/logo.png" alt="">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          background-color="#FF181D"
          text-color="#FFF"
          active-text-color="#FF181D"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">公司介绍</el-menu-item>
          <el-menu-item index="2">代理加盟</el-menu-item>
          <el-menu-item index="3">合伙人中心</el-menu-item>
          <el-menu-item index="4">产品中心</el-menu-item>
          <el-menu-item index="5">客服中心</el-menu-item>
          <el-menu-item index="6">联系我们</el-menu-item>
        </el-menu>
        <LoginBtn ref="loginBtn" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

// import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { LoginBtn } from './components'

export default {
  name: 'Layout',
  components: {
    LoginBtn
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'phone'
    ])
  },
  watch: {
    'token': function(newToken, oldToken) {
      if (!newToken) {
        this.$refs.loginBtn.goLogin()
        this.$router.push({ path: '/', query: { key: 1 }})
      }
    },
    '$route.query.key': function(newIndex, oldIndex) {
      this.activeIndex = newIndex
    }
  },
  created() {
    this.activeIndex = this.$route.query.key + ''
  },
  methods: {
    handleSelect(key, keyPath) {
      let url = ''
      if (key == 1) {
        url = '/'
      } else if (key == 2) {
        url = '/agent'
      } else if (key == 3) {
        if (!this.token) {
          this.$refs.loginBtn.goLogin()
          key = this.$route.query.key + ''
          this.activeIndex = this.$route.query.key + ''
        } else {
          url = '/partners'
        }
      } else if (key == 4) {
        url = '/product'
      } else if (key == 5) {
        url = '/agent'
      } else if (key == 6) {
        url = '/contact'
      }
      this.$router.push({ path: url, query: { key }})
    }
  }
}
</script>

<style lang="scss">
  .layout-box{
    background: #FF181D;
    height: 72px;
    width: 100%;
     .layout{
       width: 1200px;
       margin: 0 auto;
       display: flex;
       align-items: center;
       justify-content: space-between;
       height: 72px;
       >img{
         height: 60px;
       }
       .el-menu{
        // height: 72px;
        border: 0;
        .el-menu-item{
          height: 70px;
          line-height: 70px;
          margin: 0 10px;
        }
        .is-active{
          background-color: #fff !important;
          position: relative;
          &::after{
            position: absolute;
            width: calc(100% - 40px);
            height: 3px;
            border-radius: 3px;
            left: 20px;
            bottom: 10px;
            background: #FF181D;
            content: ''
          }
        }
       }
     }
  }
</style>
