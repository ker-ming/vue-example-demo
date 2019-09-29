<template>
  <div>
    <template v-for="(item, index) in content">
      <floor :key="index" :number="item.nums" :type="item.type" :data="item.goods_list" :title="item.title"></floor>
    </template>
  </div>
</template>

<script>
import { getFloorInfo } from '@/api/index'
import { mapGetters } from 'vuex'
import Floor from './Floor'
export default {
  props: {
    position: String
  },
  components: {
    Floor
  },
  computed: {
    ...mapGetters([
      'shop_id'
    ])
  },
  data() {
    return {
      content: []
    }
  },
  beforeMount() {
    this.requestFloorInfo()
  },
  methods: {
    requestFloorInfo() {
      getFloorInfo({
        use_position: this.position,
        shop_id: this.shop_id
      }).then(res => {
        let content = res.data.content.list || []
        this.content = content.filter(item => item.type == 6 || item.type == 7 || item.type == 10)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
