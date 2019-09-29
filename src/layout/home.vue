<template>
  <div class="app-wrapper">
    <div class="home-box">
      <div class="home">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          background-color=""
          text-color="#FFF"
          active-text-color="#fff"
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
import { mapGetters } from 'vuex'
import { LoginBtn } from './components'
export default {
  name: 'Home',
  components: {
    LoginBtn
  },
  data() {
    return {
      activeIndex: '1',
      loginForm: {
        phone: '',
        code: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
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
  .home-box{
    height: 72px;
    width: 100%;
     .home{
       width: 1200px;
       margin: 0 auto;
       display: flex;
       align-items: center;
       height: 72px;
       .el-menu{
        // height: 72px;
        background: rgba(0,0,0,0);
        border: 0;
        z-index: 100;
        position: relative;
        margin-right: 40px;
        .el-menu-item{
          height: 70px;
          line-height: 70px;
          margin: 0 10px;
          &:hover{
            background: #00FF181D
          }
        }
        .is-active{
          background-color: #FF181D !important;
          position: relative;
          border: 0;
          &::after{
            position: absolute;
            width: calc(100% - 40px);
            height: 3px;
            border-radius: 3px;
            left: 20px;
            bottom: 10px;
            background: #fff;
            content: ''
          }
        }
       }
     }
  }
</style>
