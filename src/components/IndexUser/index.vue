<template>
  <div>
    <img :src="avatar || defaultImage" class="user-login-image">
    <div>{{ name }}</div>
    <div class="flex-r-c text-center order-tabbar" style="margin-top: 30px;">
      <router-link :to="{path: '/personal/3', query: {id: 1, type: 2}}" class="flex-1">
        <div class="order-number">{{ getgoods_num }}</div>
        <div class="color55">待收货</div>
      </router-link>
      <router-link :to="{path: '/personal/3', query: {id: 1, type: 1}}" class="flex-1">
        <div class="order-number">{{ sendgoods_num }}</div>
        <div class="color55">待发货</div>
      </router-link>
      <router-link :to="{path: '/personal/3', query: {id: 1, type: 0}}" class="flex-1">
        <div class="order-number">{{ obligation_num }}</div>
        <div class="color55">待付款</div>
      </router-link>
      <router-link :to="{path: '/personal/3', query: {id: 1, type: 3}}" class="flex-1">
        <div class="order-number">{{ assess_num }}</div>
        <div class="color55">待评价</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrderCount } from '@/api/user'
import defaultImage from '@/assets/img/unlogin.png'
export default {
  data() {
    return {
      defaultImage,
      obligation_num: '0', // 待付款
      sendgoods_num: '0', // 待发货
      getgoods_num: '0', // 待收货
      assess_num: '0' // 待评价
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'token'
    ])
  },
  beforeMount() {
    this.requestOrderCount()
  },
  methods: {
    requestOrderCount() {
      getOrderCount({
        token: this.token,
        is_tob: true
      }).then(res => {
        const { obligation_num, sendgoods_num, getgoods_num, assess_num } = res.data
        this.obligation_num = obligation_num
        this.sendgoods_num = sendgoods_num
        this.getgoods_num = getgoods_num
        this.assess_num = assess_num
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.user-login {
  color: #555555;
  font-size: 9px;
  text-align: center;
  height: 170px;
  margin-bottom: 1px;
  &-image {
    width: 85px;
    height: 85px;
    margin-top: -15px;
  }
}

.order-number {
  color: #EA2222;
  font-size: 13px;
  line-height: 19px;
  margin-bottom: 7px;
}

</style>
