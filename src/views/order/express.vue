<template>
  <main class="logis-container">
    <div class="panel-wrapper mt30">
      <h1 class="title">查看物流</h1>
    </div>
    <div class="panel-wrapper mt30">
      <div class="info">
        <span class="cell strong">物流信息</span>
        <span class="cell">配送方式：韵达快递    到付</span>
        <span class="cell">物流：{{company}}</span>
        <span class="cell">运单号: {{code}}</span>
      </div>
      <ul class="progress">
        <li v-for="(item, index) in info" :key="index">{{item.time}} {{item.status}}</li>
      </ul>
      <!-- <div class="cloud">产品已保存在云仓，您可至"我的云仓"查看详情</div> -->
    </div>
  </main>
</template>

<script>
import { requestExpress } from '@/api/product.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      order_no: null,
      company: '',
      code: '',
      info: []
    }
  },
  created() {
    this.order_no = this.$route.query.order_no
    this.doGetExpress()
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    doGetExpress() {
      requestExpress({
        token: this.token,
        order_no: this.order_no
      }).then(res => {
        if (res.errcode == 0) {
          const { company, code, info } = res.data
          this.company = company
          this.code = code
          this.info = info
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logis-container {
  width: 1200px;
  margin: 0 auto;
  .title {
    font-size: 32px;
    line-height: 45px;
    padding: 30px 50px;
    color: #0C2543;
    margin: 0;
  }

  .progress {
    font-size: 12px;
    min-height: 300px;
    color: #4A4A4A;
    line-height: 24px;
    width: 770px;
    margin: 20px 50px;
  }

  .info {
    font-size: 0;
    line-height: 65px;
    border-bottom: 1px solid #D8D8D8;
    .cell {
      margin-left: 50px;
      font-size: 14px;
    }
  }

  .cloud {
    font-size: 12px;
    color: #4A4A4A;
    text-align: center;
    line-height: 144px;
  }
}
</style>
