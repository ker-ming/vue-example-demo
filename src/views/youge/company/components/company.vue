<template>
  <div class="companyIndex">
    <div class="company-content">
      <h1>YOUGE</h1>
      <h2>优格（广州）科技有限公司是新加坡知名国际品牌Eubiq（宜优比移动轨道电源）中国总经销公司。公司总部位于广州市番禺区万博中心区的华新汇，是一家致力于智能家居系统的应用创新研发，专注于打造生产商、代理商、消费者共享共赢的新零售智慧服务平台的创新型高科技企业。</h2>
      <div>
        <el-button type="danger" plain icon="el-icon-video-play" @click="openVideo">播放视频</el-button>
        <el-button v-if="!muted" type="danger" plain icon="el-icon-video-pause" @click="startVideo(2)">关闭声音</el-button>
        <el-button v-if="muted" type="danger" plain icon="el-icon-video-play" @click="startVideo(2)">打开声音</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" :modal="false" @close="closeVideo">
      <video-player
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playerOptions"
      />
    </el-dialog>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'CompanyIndex',
  props: ['play', 'muted'],
  data() {
    return {
      dialogTableVisible: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: 'https://eubiq.oss-cn-hangzhou.aliyuncs.com/1567404870604752_1567405621279883.mp4' // url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    const self = this
    setTimeout(function() {
      // self.startVideo(2)
    }, 1000)
  },
  methods: {
    closeVideo() {
      this.playerOptions.autoplay = false
    },
    openVideo() {
      this.dialogTableVisible = true
      this.playerOptions.autoplay = true
    },
    startVideo(index) {
      this.$emit('listenTochildEvent', index)
    }
  }
}
</script>

<style lang="scss" >
  .v-modal{
  }
  .companyIndex{
    background-size: 100%;
    height: fit-content;
    width: 100%;
    position:fixed;
    z-index: 80;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .rightBar{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
      width: 300px;
      height: 100%;
      background: url('~@/assets/yImg/right.png') no-repeat center;
      background-size: 100% 100%;
      >img{
        position: absolute;
        top: 10%;
        left: 20%;
        right: 0;
        margin: 10% auto
      }
      >ul{
        position: absolute;
        top: 35%;
        left: 20%;
        right: 0;
        margin: 10% auto;
        width: 100px;
        color: #fff;
        li{
          float: right;
          margin-bottom: 56px;
          cursor: pointer;
          padding: 10px 0;
        }
        .liActive{
          border-bottom: 1px solid #fff;
          font-size: 24px;
        }
      }
    }
    .company-content{
      position: fixed;
      z-index: 100;
      width: 1200px;
      top: 10%;
      left: 0;
      right: 0;
      margin: auto;
      h1{
        letter-spacing:13px;
        font-size: 80px;
        color: #fff;
        font-weight: 900
      }
      h2{
        color: #fff;
        font-size: 18px;
        font-weight: 400;
        width: 600px;
        line-height: 38px;
        letter-spacing:3px;
      }
      >div{
        display: flex;
        .el-button{
          display: flex;
          i{
            font-size: 18px;
            line-height: 18px;
          }
          span{
            line-height: 18px;
          }
        }
      }
    }
  }
</style>
