<template>
  <div class="more">
    <h1>走进EUNBIQ</h1>
    <ul>
      <li v-for="(item,index) in goyougeList" :key="index" @click="goDetails(item.content)">
        <img :src="item.img_url" alt="">
        <div>
          <h2>{{ item.title }}</h2>
          <p>发布时间：{{ item.create_time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'More',
  components: {
  },
  data() {
    return {
      goyougeList: []
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
        type: 2
      }
    }).then(res => {
      this.goyougeList = res.data.list
    })
  },
  methods: {
    goDetails(content) {
      this.$router.push({ path: '/details', query: { content, id: 1, key: '1' }})
    }
  }
}
</script>

<style lang="scss" >
  .more{
    position: relative;
    width: 1200px;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    h1{
        font-size: 24px;
        margin: 60px 0 45px 0;
        font-weight: 500;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            left: 30px;
            bottom: 0;
            width:110px;
            height:17px;
            background:rgba(255,24,29,1);
            opacity:0.3;
        }
    }
    ul{
        margin-bottom: 100px;
        li{
            cursor: pointer;
            width: 1200px;
            height: 220px;
            background: #fff;
            padding: 15px;
            margin-bottom: 40px;
            border-radius: 5px;
            img{
                height: 180px;
                width: 180px;
                border-radius: 3px;
                float: left;
                margin-right: 60px;
            }
            >div{
                float: left;
                h2{
                    font-size: 26px;
                    line-height: 50px;
                }
                p{
                    font-size: 16px;
                    margin-top: 100px;
                }
            }
        }
    }
  }
</style>
