<template>
  <main class="cart-container">
    <div class="panel-wrapper mt30">
      <order-guide />
    </div>

    <table class="panel-wrapper mt30" style="width: 100%;">
      <thead>
        <tr class="product-header">
          <th width="160">产品图片</th>
          <th width="240">产品名称</th>
          <th width="200">型号规格</th>
          <th width="160">单价</th>
          <th width="160">数量</th>
          <th width="160">小计</th>
          <th width="120" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartList" :key="index" class="product">
          <td width="160" class="position-relative font-0">
            <input type="checkbox" class="reset-radio product-checkbox" :checked="item.checked" @click="checkItem(item.cart_id)">
            <img class="product-image" :src="item.img_url" alt="">
          </td>
          <td width="240">{{ item.title }}</td>
          <td width="200">型号：{{ item.value_names }}</td>
          <td width="160">¥{{ item.price }}</td>
          <td width="160">
            <div>
              <span class="reduce" @click="reduceGood(item)" />
              <input type="number" class="calc" :value="item.num * 1" :data-id="item.cart_id" @input="inputNumber">
              <span class="add" @click="addGood(item)" />
            </div>
          </td>
          <td width="160" class="theme_font--color">¥{{ item.num * item.price }}</td>
          <td width="120" @click="remove(item.cart_id)">
            <a href="javascript: void(0);">删除</a>
          </td>
        </tr>
      </tbody>
    </table>

    <footer class="panel-wrapper mt30 clearfix">
      <div class="fl font-0 checked-number">
        <input type="checkbox" class="reset-radio" :checked="checkAllFlag" @click="checkAll">
        <span>全选</span>
        <span>已勾选<span class="theme_font--color">{{ totalNum }}</span>件商品（不含运费）</span>
      </div>
      <div class="fr">
        <span class="font-0 money-number">
          <span>合计:</span>
          <span class="theme_font--color">¥{{ totalPrice }}</span>
        </span>
        <a href="javascript: void(0);" class="danger confirm-btn" @click="confirm">结算</a>
      </div>
    </footer>
  </main>
</template>

<script>
import OrderGuide from './components/OrderGuide'
import { mapGetters } from 'vuex'
export default {
  components: {
    OrderGuide
  },
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('order/initBuyCart')
  },
  computed: {
    ...mapGetters({
      'cartList': 'cart_list'
    }),
    chooseList() {
      return this.cartList.filter(item => item.checked)
    },
    // 是否全选
    checkAllFlag() {
      return this.cartList.length === this.chooseList.length
    },
    totalNum() {
      let count = 0
      this.chooseList.map(item => {
        count += (item.num * 1)
      })
      return count
    },
    totalPrice() {
      let price = 0
      this.chooseList.map(item => {
        price += (item.price * 1) * (item.num * 1)
      })
      return price
    }
  },
  methods: {
    confirm() {
      if (this.chooseList.length === 0) {
        this.$message({
          message: '未选中任何商品',
          type: 'warning'
        })
      } else {
        this.$store.commit('order/SAVE_LOCALSTORAGE')
        this.$router.push({ name: 'confirm' })
      }
    },
    // 选中
    checkItem(id) {
      this.$store.commit('order/CHECKED_BUYCART', id)
    },
    // 删除
    remove(id) {
      this.$confirm('确认删除该物品吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        center: true
      }).then(() => {
        this.$store.dispatch('order/reduceCart', {
          ids: [id]
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 更新数量
    inputNumber(e) {
      this.$store.dispatch('order/updateCart', {
        cart_id: e.target.dataset.id,
        num: e.target.value
      })
    },

    // 减少商品
    reduceGood({ num, cart_id }) {
      num = parseInt(num)
      if (num !== 1) {
        this.$store.dispatch('order/updateCart', {
          cart_id,
          num: --num
        })
      }
    },

    // 增加商品
    addGood({ num, cart_id }) {
      num = parseInt(num)
      this.$store.dispatch('order/updateCart', {
        cart_id,
        num: ++num
      })
    },

    // 全选
    checkAll() {
      if (this.checkAllFlag) {
        this.$store.commit('order/CHECKED_ALL', false)
      } else {
        this.$store.commit('order/CHECKED_ALL', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  width: 1200px;
  margin: 30px auto;

  .product {
    height: 100px;
    color: rgba(74, 74, 74, 1);
    font-size: 14px;
    text-align: center;
    border-top: 1px solid rgba(12, 37, 67, .1);
    &-header {
      height: 62px;
      font-weight: 600;
      vertical-align: middle;
    }

    &-image {
      width: 62px;
      height: 62px;
      display: inline-block;
      vertical-align: middle;
    }

    &-checkbox {
      position: absolute;
      left: 17px;
      top: 42px;
    }

    .calc {
      width: 32px;
      height: 24px;
      border-radius: 4px;
      text-align: center;
      line-height: 24px;
      border: 1px solid rgba(198,207,217,1);
    }

    .reduce, .add {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      cursor: pointer;
      background-color: rgba(255, 24, 29, 1);
      &:before {
        content: "";
        width: 12px;
        height: 0;
        border-bottom: 2px solid #fff;
        position: absolute;
        top: 8px;
        left: 3px;
      }
    }

    .add:after {
      content: "";
      width: 0;
      height: 12px;
      border-left: 2px solid #fff;
      position: absolute;
      top: 3px;
      left: 8px;
    }
  }

  .checked-number {
    line-height: 70px;
    padding-left: 50px;
    input {
      display: inline-block;
      vertical-align: middle;
    }

    &>span {
      font-size: 14px;
      margin-left: 20px;
      vertical-align: middle;
    }
  }

  .money-number {
    margin-right: 50px;
    span {
      font-size: 16px;
    }
  }

  .confirm-btn {
    width: 153px;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    text-align: center;
    display: inline-block;
  }
}
</style>
