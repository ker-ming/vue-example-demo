<template>
  <div class="goyouge">
    <ul :style="{marginLeft: bannerLeft+'px'}">
      <li>
        <h1>GUANGZHOU  YOUGE</h1>
        <h2>走进优格</h2>
        <el-button type="danger" plain @click="goMore">查看更多</el-button>
      </li>
      <li v-for="(item,index) in goyougeList" :key="index" @click="goDetails(item.content)">
        <h1 class="li-text">{{ item.title }}</h1>
        <h2 class="li-time">发布时间：{{ item.create_time }}</h2>
        <img :src="item.img_url" alt="">
        <p class="li-p">{{ item.remark }}</p>
      </li>
    </ul>
    <ol>
      <li v-for="(item,index) in bannerBtn" :key="index" :class="index === bannerIndex ? 'active': ''" @click="clickBanner(index)" />
    </ol>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Goyouge',
  data() {
    return {
      goyougeList: [],
      bannerLeft: 0,
      bannerIndex: 0
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
      if (res.data.total_pages == 0) {
        this.bannerBtn = res.data.total_pages = 0
      } else {
        this.bannerBtn = res.data.total_pages - 1
      }
    })
  },
  methods: {
    clickBanner(index) {
      this.bannerIndex = index
      if (index == 0) {
        this.bannerLeft = 0
      } else {
        this.bannerLeft = -220 - index * 350
      }
    },
    goMore(content) {
      this.$router.push({ path: '/more', query: { content, id: 1, key: '1' }})
    },
    goDetails(content) {
      this.$router.push({ path: '/details', query: { content, id: 1, key: '1' }})
    }
  }
}
</script>

<style lang="scss" >
  .goyouge{
    position: fixed;
    z-index: 100;
    width: 1200px;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    ul{
        width: max-content;
        white-space: nowrap;
        height: 430px;
        transition: 2s;
        li{
            width: 330px;
            float: left;
            border-radius: 3px;
            margin-right: 20px;
            height: 430px;
            padding: 20px 30px;
            background: #fff;
            cursor: pointer;
            &:nth-child(1){
                width: 210px;
                background: #FF181D;
                color: #fff;
                h1{
                    font-size: 12px;
                    font-weight: 400;
                }
                h2{
                    font-size: 24px;
                    margin-top: 10px;
                }
                .el-button{
                    margin-top: 120px;
                    color: #FF181D;
                    font-weight: 600;
                    background: #fff;
                    &:hover{
                        background: #fef0f0
                    }
                }
            }
            .li-text{
                font-size:20px;
                line-height:28px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin: 0;
                height: 56px;
                margin-bottom: 5px
            }
            .li-time{
                font-size:15px;
                font-weight:500;
                color:rgba(124,124,124,1);
                line-height:21px;
            }
            img{
                width: 100%;
                height: 135px;
            }
            p{
                word-wrap:break-word;
                margin-top: 10px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 12;
                overflow: hidden;
                font-size: 11px;
                color: #8B8B8B
            }
        }
    }
    ol{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        align-items:flex-end;
        li{
            margin: 0 7px;
            height: 15px;
            width: 5px;
            border-radius:5px;
            background: #fff;
            cursor: pointer;
            transition: 1s;
        }
        .active{
            height: 30px;
        }
    }
  }
</style>
