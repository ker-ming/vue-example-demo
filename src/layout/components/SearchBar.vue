<template>
  <header class="search-bar">
    <div class="search-content">
      <router-link :to="{ path: '/' }" class="search-content--logo"></router-link>
      <div class="search-content--input">
        <el-input class="reset-input" :value="search_value" @input="updateQuery" auto-complete="on" prefix-icon="el-icon-search" placeholder="搜索商品，共2000款好物"></el-input>
        <button class="search-content--button theme_bg--color" @click="tosearch">搜索</button>
      </div>
      <div class="scan-code theme_font--color">
        手机扫一扫
        <img :src="imgCode" alt="">
      </div>
    </div>
  </header>
</template>

<script>
import { getQrcode } from '@/api/index'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      imgCode: ''
    }
  },
  created() {
    this.requestQrcode()
  },
  computed: {
    ...mapGetters([
      'search_value'
    ])
  },
  methods: {
    tosearch() {
      const { pid, mcid } = this.$route.query
      this.$router.push({ name: 'search', query: { q: this.search, pid, mcid }})
    },

    // 首页二维码
    requestQrcode() {
      getQrcode().then(res => {
        this.imgCode = res.data
      }).catch(error => {
        console.log(error)
      })
    },

    // 更新搜索值
    updateQuery(value) {
      this.$store.commit('app/SEARCH_VALUE', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  height: 124px;
  z-index: 1000;
  background: white;
  box-shadow: 0px 1px 8px 0px rgba(239, 246, 240, 1);
}

.search-content {
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  &--logo {
    float: left;
    width: 190px;
    height: 100px;
    margin-top: 12px;
    vertical-align: middle;
    background: url("../../assets/img/logo.png") no-repeat center;
    background-size: contain;
  }
  &--input {
    position: absolute;
    left: 50%;
    top: 42px;
    width: 638px;
    height: 40px;
    transform: translateX(-50%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(83,195,93,1);
  }
  &--button {
    border: none;
    color: white;
    height: 100%;
    width: 82px;
    font-size: 13px;
    &:hover {
      border: none;
      background-color: #49A251;
    }
  }
}

.el-input {
  flex: 1;
}

.scan-code {
  width: 78px;
  height: 78px;
  float: right;
  font-size: 9px;
  line-height: 25px;
  text-align: center;
  border-radius: 1px;
  margin-top: 23px;
  border: 1px solid rgba(225,229,225,1);
  img {
    width: 45px;
    height: 45px;
  }
}
</style>
