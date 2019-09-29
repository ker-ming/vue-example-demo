<template>
  <div class="details">
    <el-breadcrumb v-if="id" separator="/">
      <span style="float: left">当前位置：</span>
      <el-breadcrumb-item>公司介绍</el-breadcrumb-item>
      <el-breadcrumb-item>走进Eubiq</el-breadcrumb-item>
      <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="details-content" v-html="content" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Details',
  components: {
  },
  data() {
    return {
      content: '',
      id: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'shop_id'
    ])
  },
  created() {
    this.content = this.$route.query.content
    this.id = this.$route.query.id
  },
  methods: {

  }
}
</script>

<style lang="scss" >
  .details{
    position: relative;
    width: 1200px;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    .el-breadcrumb{
      margin: 30px 0;
    }
    .details-content{
      margin-top: 30px;
      overflow-x: auto;
    }
    img{
      // width: 300px;
    }
  }
</style>
