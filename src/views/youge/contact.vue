<template>
  <div class="contact">
    <img :src="contactData.liemi_intel_img_url" alt="">
    <h1>联系我们</h1>
    <h2>{{ contactData.liemi_intel_name }}</h2>
    <h3>电话：{{ contactData.liemi_intel_tel }}</h3>
    <h3>传真：{{ contactData.liemi_intel_fax }}</h3>
    <h3>邮箱：{{ contactData.liemi_intel_email }}</h3>
    <h3>邮编：{{ contactData.liemi_intel_postcode }}</h3>
    <p>地址：{{ contactData.liemi_intel_location }}</p>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Contact',
  data() {
    return {
      contactData: []
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
      url: '/base/intel-api/info',
      method: 'post'
    }).then(res => {
      this.contactData = res.data
    })
  }
}
</script>

<style lang="scss" >
  .contact{
    width: 1200px;
    margin: 60px auto 100px;
    img{
      width: 100%
    }
    h1{
      font-size: 32px;
      font-weight: 400;
      margin: 50px 0 20px;
    }
    h2{
      font-size: 20px;
      margin: 15px 0 15px;
    }
    h3{
      font-size: 16px;
      line-height: 32px;
      font-weight: 400;
    }
    p{
      font-size: 16px;
      margin-top: 20px;
    }
  }
</style>
