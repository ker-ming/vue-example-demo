<template>
  <header v-show="flag" class="search-bar">
    <div class="search-content">
      <img class="search-content--logo" src="@/assets/img/logo.png" alt="" @click='jump'>
      <span>{{ title }}</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PerNavbar',
  data() {
    return {
      flag: true,
      id: '',
      title: ''
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      this.$data.id = window.location.hash.split('?id=')[1]
      if (this.$data.id === '1') {
        this.$data.title = '个人中心'
        this.$data.flag = true
      } else if (this.$data.id === '2') {
        this.$data.title = '购物车'
        this.$data.flag = true
      } else if (this.$data.id === '3') {
        this.$data.title = '收银台'
        this.$data.flag = true
      } else if (this.$data.id === '4') {
        this.$data.title = ''
        this.$data.flag = true
      } else if (this.$data.id === '5') {
        this.$data.flag = false
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    if (this.id === '1') {
      this.title = '个人中心'
      this.flag = true
    } else if (this.id === '2') {
      this.title = '购物车'
      this.flag = true
    } else if (this.id === '3') {
      this.title = '收银台'
      this.flag = true
    } else if (this.id === '4') {
      this.title = ''
      this.flag = true
    } else if (this.id === '5') {
      this.flag = false
    }
  },
  methods:{
    jump(){
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  height: 124px;
  background: white;
  box-shadow: 0px 1px 8px 0px rgba(239,246,240,1);
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
    object-fit: contain;
    user-select: none;
    cursor: pointer;
  }
  span{
    font-size: 22px;
    line-height: 124px;
    font-weight: 500;
  }
}

.el-input {
  flex: 1;
}
</style>
