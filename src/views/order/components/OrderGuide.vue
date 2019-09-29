<template>
  <nav>
    <table style="width: 100%;">
      <tbody>
        <tr class="guide">
          <td width="599">
            <span class="nag" :class="{'theme_font--color': $route.name === 'cart'}" @click="goCart">
              <i class="el-icon-shopping-bag-2 icon-text" />
              <span class="icon-text">我的购物车</span>
            </span>
          </td>
          <td>
            <span class="sep" />
          </td>
          <td>
            <span class="nag" :class="{'theme_font--color': $route.name === 'myorder' || $route.name === 'orderinfo'}" @click="goOrder">
              <span class="icon-text">我的订单</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </nav>
</template>

<script>
export default {
  name: 'OrderGuide',
  methods: {
    goCart() {
      if (this.$route.name !== 'cart') {
        this.$router.push({ name: 'cart' })
      }
    },

    goOrder() {
      if (this.$route.name !== 'myorder' && this.$route.name !== 'orderinfo') {
        this.$router.push({ name: 'myorder' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guide {
  font-size: 16px;
  height: 90px;
  text-align: center;
  border-bottom: 1px solid rgba(12, 37, 67, .2);
  .sep {
    width: 1px;
    height: 40px;
    display: inline-block;
    background-color: #C6CFD9;
  }

  .nag {
    font-size: 0;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    .icon-text {
      font-size: 16px;
      display: inline-block;
      vertical-align: middle;
    }

    i.icon-text {
      margin-right: 5px;
      font-weight: 600;
    }
  }
}
</style>
