<template>
  <div class="company">
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
    />
    <div :class="{anmu:true, zanmu: liFlag !== 1}" />
    <CompanyIndex v-if="liFlag === 1" :play="playerOptions.autoplay" :muted="playerOptions.muted" @listenTochildEvent="showMessageFromChild" />
    <CompanyInfo v-if="liFlag === 2" />
    <CompanyIntroduction v-if="liFlag === 3" />
    <GoYouGe v-if="liFlag === 4" />
    <div class="rightBar">
      <img src="@/assets/yImg/logo.png" alt="">
      <ul>
        <li :class="liFlag === 1? 'liActive': ''" @click="liFlag = 1">广州优格</li>
        <li :class="liFlag === 2? 'liActive': ''" @click="liFlag = 2">banner</li>
        <li :class="liFlag === 3? 'liActive': ''" @click="liFlag = 3">公司介绍</li>
        <li :class="liFlag === 4? 'liActive': ''" @click="liFlag = 4">走进优格</li>
      </ul>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'
import CompanyIndex from './components/company.vue'
import CompanyInfo from './components/companyInfo.vue'
import CompanyIntroduction from './components/companyIntroduction.vue'
import GoYouGe from './components/goYouGe.vue'

export default {
  name: 'Company',
  components: {
    CompanyIndex,
    CompanyIntroduction,
    CompanyInfo,
    GoYouGe
  },
  data() {
    return {
      liFlag: 1,
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
    request({
      url: '/base/intel-api/info',
      method: 'post',
      data: {}
    }).then(res => {
      this.playerOptions.sources.src = res.data.liemi_intel_vedio_url
    })
  },
  methods: {
    showMessageFromChild(data) {
      if (data === 1) {
        this.playerOptions.autoplay = !this.playerOptions.autoplay
      } else if (data === 2) {
        if (this.playerOptions.muted) {
          this.playerOptions.muted = false
        } else {
          this.playerOptions.muted = true
        }
      }
    }
  }
}
</script>

<style lang="scss" >
  .company{
    background-size: 100%;
    height: fit-content;
    width: 100%;
    position:fixed;
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
    .vjs-big-play-button{
      display: none !important;
    }
    .anmu{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
      left: 0;
      top: 0;
      z-index: 50;
    }
    .zanmu{
      background: rgba(0,0,0,0.8);
    }
    &-content{
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
      .el-button{
        margin-top: 5%;
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
</style>
