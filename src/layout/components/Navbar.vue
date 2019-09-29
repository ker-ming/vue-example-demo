<template>
  <div class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="logo-container">
        <img class="navbar-logo" src="@/assets/img/logo.png" alt="">
        <span class="title">{{ $route.meta.title }}</span>
      </router-link>
      <router-link v-if="$route.name === 'register'" class="navbar-login" :to="{path: '/login'}">已有账号，直接登陆</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      token: getToken()
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 82px;
  z-index: 1000;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  &-content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }

  &-login {
    color: #777777;
    font-size: 18px;
    float: right;
    line-height: 82px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  &-logo {
    width: 64px;
    height: 54px;
    vertical-align: middle;
  }

  .logo-container {
    float: left;
    height: 100%;
    font-size: 21px;
    line-height: 82px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .title {
    margin-left: 8px;
    color: #333;
    font-weight: 600;
  }
}
</style>
