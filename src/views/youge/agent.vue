<template>
  <div class="agent">
    <div v-html="content" />
  </div>
</template>

<script>

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Agent',
  data() {
    return {
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
      url: '/content/content-api/view',
      method: 'post',
      data: {
        type: 3
      }
    }).then(res => {
      this.content = res.data.content
    })
  }
}
</script>

<style lang="scss" >
  .agent{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
