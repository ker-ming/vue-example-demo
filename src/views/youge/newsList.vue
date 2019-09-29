<template>
  <div class="newsList">
    <div class="newsList-1">
      <span :class="nIndex === 1? 'active': ''" @click="newsList(1)">平台公告</span>
      <span :class="nIndex === 2? 'active': ''" @click="newsList(2)">系统通知</span>
    </div>
    <ul class="newsList-2">
      <li v-for="(item,index) in goyougeList" :key="index" @click="goDetails(item.content)">
        <h2>{{ item.title }}</h2>
        <p>{{ item.create_time }}</p>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="newsList_total_pages"
      :current-page="newsList_start_page+ 1"
      @current-change="pageChange"
    />
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'NewsList',
  components: {
  },
  data() {
    return {
      goyougeList: [],
      nIndex: 1,
      newsList_total_pages: 0,
      newsList_start_page: 0
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    this.newsList(1)
  },
  methods: {
    pageChange(data) {
      this.newsList_start_page = data - 1
      this.newsList()
    },
    goDetails(content) {
      this.$router.push({ path: '/details', query: { content, id: 0, key: '1' }})
    },
    newsList(index) {
      const self = this
      if (index) {
        this.nIndex = index
      }
      request({
        url: '/information/information-api/index',
        method: 'post',
        data: {
          type_arr: self.nIndex,
          token: self.token,
          start_page: self.newsList_start_page,
          pages: 10
        }
      }).then(res => {
        this.goyougeList = res.data.list
        this.newsList_total_pages = res.data.total_pages - 0
      })
    }
  }
}
</script>

<style lang="scss" >
  .newsList{
    position: relative;
    width: 1200px;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    &-1{
      width:1200px;
      height:90px;
      background:rgba(255,255,255,1);
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.04);
      border-radius:4px;
      margin: 40px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span{
        height: 40px;
        text-align: center;
        line-height: 40px;
        flex: 1;
        cursor: pointer;
        font-weight: 600;
        &:nth-child(1){
          border-right: 1px solid #ddd;
        }
      }
      .active{
        color: #FF181D
      }
    }
    &-2{
        margin-bottom: 100px;
        background: #fff;
        border-radius: 5px;
        li{
            cursor: pointer;
            width: 1200px;
            height: 85px;
            padding: 0 40px;
            border-bottom: 1px solid #EBEBEB;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h2{
                font-size: 18px;
            }
            p{
                font-size: 16px;
                color: #575757
            }
        }
    }
  }
</style>
