<template>
  <div class="companyIntroduction">
    <img :src="cIimg" alt="">
    <div class="companyIntroduction-text">
      <div class="companyIntroduction-text-head">
        <el-button type="danger" @click="goDetails">查看更多</el-button>
        <div>
          <h1>公司介绍</h1>
          <h2>COMPANY PROFILE</h2>
        </div>
      </div>
      <p>{{ remark }}</p>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'CompanyIntroduction',
  data() {
    return {
      cIimg: '',
      remark: '',
      content: ''
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
      url: '/information/information-api/index',
      method: 'post',
      data: {
        type: 1
      }
    }).then(res => {
      this.cIimg = res.data.list[0].img_url
      this.remark = res.data.list[0].remark
      this.content = res.data.list[0].content
    })
  },
  methods: {
    goDetails() {
      const content = this.content
      this.$router.push({ path: '/details', query: { content, key: '1' }})
    }
  }
}
</script>

<style lang="scss" >
  .companyIntroduction{
    position: fixed;
    z-index: 100;
    width: 1200px;
    top: 35%;
    left: 0;
    right: 0;
    margin: auto;
    >img{
        height: 237px;
        width: 374px;
        float: left;
    }
    &-text{
        float: left;
        color: #fff;
        margin-left: 35px;
        width: 375px;
        height: 237px;
        &-head{
            height: fit-content;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button{
                background: #FF181D;
                height: 41px;
                width: 105px;
            }
            >div{
                h1{
                    text-align: right
                }
                h2{
                    text-align: right;
                    font-size: 12px;
                    font-weight: 400;
                    letter-spacing:2px;
                }
            }
        }
        p{
            margin-top: 48px;
            word-wrap:break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
            overflow: hidden;
            letter-spacing:2px;
            font-size: 11px;
        }
    }
  }
</style>
