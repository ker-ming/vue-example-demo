<template>
  <div class="detail-container">
    <table class="guide" border="0">
      <tbody>
        <tr class="row">
          <td width="599">
            <router-link to="/cart" class="mycart">
              <i />
              <span class="font-16">我的购物车</span>
            </router-link>
          </td>
          <td>
            <div class="sep" />
          </td>
          <td width="599">
            <router-link to="/myorder" class="font-16">我的订单</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="good clearfix">
      <div class="images fl">
        <image-list :data="itemImgs" />
      </div>

      <div class="detail-props fl">
        <h1 class="props-title">{{ title }}</h1>
        <div v-for="(spec) in specs" :key="spec.prop_id" class="font-0 props">
          <span class="props-name">{{ spec.prop_name }}</span>
          <template v-if="spec.children.length > 0">
            <span
              v-for="(item, index) in spec.children"
              :key="index"
              class="tag"
              :class="{'select': selected_spec[spec.prop_id] === item.value_id}"
              @click="selectSpec(spec.prop_id, item.value_id)"
            >
              {{ item.value_name }}
            </span>
          </template>
        </div>
        <div class="font-0 props">
          <span class="props-name">数量</span>
          <div class="clearfix input-number">
            <div class="input-reduce" @click="reduce">-</div>
            <input v-model="number" type="number">
            <div class="input-add" @click="add">+</div>
          </div>
        </div>
        <div class="prop-buy font-0 clearfix">
          <div class="fl">
            <a href="javascript: void(0);" class="btn danger mr20" @click="purchase">立即购买</a>
            <a href="javascript: void(0);" class="btn success" @click="addShopCart">加入购物车</a>
          </div>
          <div class="fr theme_font--color price">¥{{ price }}</div>
        </div>
      </div>
    </div>

    <div class="describe">
      <div class="detail-info">
        <a href="javascript: void(0);" class="info-title">商品详情</a>
      </div>
      <div v-html="richtext" />
    </div>
  </div>
</template>

<script>
import ImageList from './components/ImageList.vue'
import { setStore } from '../../utils/storage'
import { requestDetail, requestProperty, requestAllProperty } from '@/api/product.js'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductDetail',
  components: {
    ImageList
  },
  data() {
    return {
      number: 1,
      specs: [],
      item_id: null,
      itemImgs: [],
      title: '',
      richtext: '',
      spec_all: [],
      selected_spec: {},
      info: null,
      price: 0,
      ivid: null,
      value_names: ''
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.item_id = this.$route.params.id
    this.doGetDetail()
    this.doGetProperty()
    this.doGetAllProperty()
  },
  methods: {
    reduce() {
      if (this.number > 1) {
        this.number--
      }
    },
    add() {
      this.number++
    },
    // 选择
    selectSpec(propId, specId) {
      this.$set(this.selected_spec, propId, specId)
      const value_ids = Object.values(this.selected_spec)
      const value_id = value_ids.join(',')
      for (let i = 0; i < this.spec_all.length; i++) {
        if (this.spec_all[i].value_ids === value_id) {
          const { ivid, price, value_names } = this.spec_all[i]
          this.ivid = ivid
          this.price = price
          this.value_names = value_names
          return
        }
      }
    },
    // 获取商品详情
    doGetDetail() {
      requestDetail({
        token: this.token,
        item_id: this.item_id
      }).then(res => {
        if (res.errcode == 0) {
          const { title, itemImgs, rich_text, price } = res.data
          this.title = title
          this.itemImgs = itemImgs
          this.richtext = rich_text
          this.info = res.data
          this.price = price
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取商品规格
    doGetProperty() {
      requestProperty({
        token: this.token,
        item_id: this.item_id
      }).then(res => {
        if (res.errcode == 0) {
          this.specs = res.data || []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取商品全部规格
    doGetAllProperty() {
      requestAllProperty({
        item_id: this.item_id
      }).then(res => {
        if (res.errcode == 0) {
          this.spec_all = res.data || []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加到购物车
    addShopCart() {
      if (!this.ivid) {
        this.$message({
          message: '请选择规格',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('order/addCart', {
        ivid: this.ivid,
        num: this.number
      }).then(res => {
        this.$message({
          message: '成功添加',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ name: 'cart' })
        }, 500)
      }).catch(error => {
        console.log(error)
      })
    },
    // 立即购买
    purchase() {
      if (this.ivid) {
        const { title, remark, img_url, price, is_prebuy, item_id, postage, prebuy_start_time, prebuy_end_time } = this.info
        this.$store.commit('order/SAVE_LOCALSTORAGE', [{
          title,
          remark,
          img_url,
          item_id,
          price: this.price,
          num: this.number,
          ivid: this.ivid,
          is_prebuy,
          postage,
          value_names: this.value_names,
          prebuy_start_time,
          prebuy_end_time
        }])
        this.$router.push({ name: 'confirm' })
      } else {
        this.$message({
          message: '请选择规格',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  width: 1200px;
  margin: 30px auto;
  .guide {
    width: 100%;
    text-align: center;
    background-color: white;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    border-radius: 4px;
    .row {
      height: 90px;
    }

    .sep {
      width: 2px;
      height: 40px;
      background-color: rgba(198, 207, 217, 1);
    }

    .mycart {
      font-size: 0;
      line-height: 22px;
      i {
        width: 21px;
        height: 20px;
        margin-right: 12px;
        display: inline-block;
        vertical-align: middle;
        background: url(../../assets/img/cart.png) no-repeat center;
        background-size: 21px 20px;
      }

      span {
        font-size: 16px;
        vertical-align: middle;
      }
    }
  }

  .good {
    width: 1200px;
    height: 480px;
    margin: 30px 0;
    padding: 48px 72px 50px 72px;
    background-color: white;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    border-radius: 4px;
  }

  .images {
    width: 300px;
  }

  .detail-props {
    width: 700px;
    margin-left: 50px;
    position: relative;
    .props-title {
      font-weight: 500;
      line-height: 40px;
      font-size: 28px;
      color: rgba(51, 51, 51, 1);
      margin-top: 24px;
      margin-bottom: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .props {
      margin: 10px 0;
    }

    .props-name {
      font-size: 18px;
      display: inline-block;
      margin-right: 30px;
      vertical-align: middle;
      color: rgba(74, 74, 74, 1);
    }

    .tag {
      font-size: 12px;
      min-width: 65px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      margin-right: 20px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      border: 1px solid rgba(221,221,221,1);
      &.select {
        color: white;
        border-color: transparent;
        background-color: rgba(255, 24, 29, 1);
      }
    }

    .input-number {
      font-size: 12px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 82px;
      input {
        width: 32px;
        height: 24px;
        text-align: center;
        margin: 0 26px;
      }
      .input-reduce {
        position: absolute;
        top: 50%;
        left: 0;
        width: 18px;
        height: 18px;
        text-align: center;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        line-height: 18px;
        transform: translateY(-50%);
        user-select: none;
        background-color: rgba(255, 24, 29, 1);
      }
      .input-add {
        position: absolute;
        top: 50%;
        right: 0;
        width: 18px;
        height: 18px;
        cursor: pointer;
        color: white;
        text-align: center;
        border-radius: 50%;
        line-height: 18px;
        user-select: none;
        background-color: rgba(255, 24, 29, 1);
        transform: translateY(-50%);
      }
    }
  }

  .prop-buy {
    margin-top: 60px;
    .price {
      font-size: 24px;
    }
  }

  .mr20 {
    margin-right: 20px;
  }

  .describe {
    width: 1200px;
    min-height: 385px;
    background-color: white;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.04);
    .detail-info {
      padding: 0 50px;
      font-size: 16px;
      line-height: 80px;
      border-bottom: 1px solid rgba(12, 37, 67, .2);
    }
  }

}
</style>
