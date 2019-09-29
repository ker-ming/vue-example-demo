<template>
  <div>
    <div class="tag-list">
      <span :class="{'tag-1': true, 'selected': flag === 0}" @click="switchPic(0)">全部（{{pic_commet_num}}）</span>
      <span :class="{'tag-1': true, 'selected': flag === 1}" @click="switchPic(1)">有图（{{sum_commet_num}}）</span>
    </div>
    <div>
      <div>
        <template v-for="(n, index) in comments">
          <div :key="index" class="comment">
            <div class="user-column">
              <img class="user-column-img" :src="n.u.head_url" alt="">
              <div class="user-column-title">{{n.u.nickname}}</div>
            </div>
            <div class="comment-column">
              <div class="comment-con">{{n.content}}</div>
              <div>
                <pic-list :urls="n.meCommetImgs || []"></pic-list>
              </div>
              <div class="comment-date">
                <span>{{n.create_time}}</span>
                <span style="margin-left: 22px;">{{n.value_names}}</span>
              </div>
              <div class="comment-content">
                <img class="fl comment-avatar" :src="n.to_commet.u.head_url" alt="">
                <div class="comment-fulltext">
                  <span class="theme_font--color">[掌柜回复]</span>
                  <span>{{n.to_commet.content}}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <el-pagination
        background
        class="fr pagin"
        layout="prev, pager, next"
        current-change="loadmore"
        :total="total_page">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import PicList from '@/components/PicList/index'
import { requestComment } from '@/api/good'
export default {
  props: {
    id: String
  },
  components: {
    PicList
  },
  data() {
    return {
      flag: 0,
      comments: [],
      total_page: 0,
      pic_commet_num: 0,
      sum_commet_num: 0
    }
  },
  mounted() {
    this.getAssessList(0)
  },
  methods: {
    switchPic(index) {
      this.flag = index
    },
    loadmore(index) {
      this.getAssessList(index - 1)
    },
    getAssessList(start) {
      requestComment({
        start_page: start,
        pages: 10,
        item_id: this.id,
        flag: this.flag
      }).then(res =>　{
        let list = res.data.list || []
        this.total_page = res.data.total_page
        this.pic_commet_num = res.data.pic_commet_num
        this.sum_commet_num = res.data.sum_commet_num
        this.comments = list
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  padding: 44px 0px;
  overflow: hidden;
  border-bottom: 1px solid #E8E8E8;
  &-column {
    margin-left: 88px;
  }
  &-avatar {
    width: 34px;
    height: 34px;
  }
  &-con {
    color: #333333;
    font-size: 13px;
    line-height: 19px;
    font-weight: 500;
  }
  &-fulltext {
    margin-left: 54px;
    width: 485px;
  }
  &-date {
    font-size: 10px;
    color: #777777;
  }
  &-content {
    width: 556px;
    font-size: 10px;
    line-height: 19px;
    color: #777777;
    word-wrap: break-word;
    word-break: break-all;
    padding: 20px 10px;
    background-color: #F3F9F4;
  }
}


.user-column {
  width: 88px;
  float: left;
  text-align: center;
  &-img {
    width:52px;
    height:52px;
    border-radius:3px;
  }
  &-title {
    font-size: 12px;
    color: #333333;
    margin-top: 7px;
    line-height: 16px;
  }
}

.tag {
  &-list {
    padding-left: 10px;
    padding-bottom: 13px;
    border-bottom: 1px solid #E8E8E8;
  }

  &-1 {
    display: inline-block;
    height: 34px;
    color: #53C35D;
    font-size: 13px;
    cursor: pointer;
    line-height: 34px;
    border-radius: 17px;
    padding: 0 10px;
    text-align: center;
    margin-right: 30px;
    border: 1px solid #53C35D;
  }
}

.selected {
  color: white;
  background-color: #53C35D;
}

.pagin {
  margin: 15px 0;
}
</style>
