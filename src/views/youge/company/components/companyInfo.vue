<template>
  <div class="companyInfo">
    <el-carousel height="30vw" indicator-position="outside" arrow="never">
      <el-carousel-item v-for="item in bannerImgs" :key="item">
        <img :src="item.img_url" alt="" @click="goDetails(item.content)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'CompanyInfo',
  data() {
    return {
      bannerImgs: []
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    request({
      method: 'post',
      url: '/banner/banner-api/index',
      data: {
        seat_id: 3
      }
    }).then(res => {
      this.bannerImgs = res.data.list
    })
  },
  methods: {
    goDetails(content) {
      this.$router.push({ path: '/details', query: { content, id: 0, key: '1' }})
    }
  }
}
</script>

<style lang="scss" >
  .companyInfo{
    position: fixed;
    z-index: 100;
    width: 1200px;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    .el-carousel{
      width: 60vw;
    }
    .el-carousel__item{
      text-align: center;
      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
