import Vue from 'vue'
import { setStore, getStore, removeStore } from '@/utils/storage'
import { addShopCart, shopCartList, deleteCartList, clearCartList, updateCartList } from '@/api/product.js'

function getBuyStore(name) {
  const item = getStore(name)
  if (item) {
    return JSON.parse(item)
  }
  return null
}

const state = {
  cartList: [], // 加入购物车的商品列表
  storeList: getBuyStore('buyCart'), // 缓存的商品列表
  payOrder: getBuyStore('payOrder') // 支付商品信息
}

const mutations = {
  // 移出购物车
  REDUCE_BUYCART: (state, ids) => {
    const cartList = state.cartList
    for (let i = cartList.length - 1; i >= 0; i--) {
      const index = ids.indexOf(cartList[i].cart_id)
      if (index !== -1) {
        state.cartList.splice(i, 1)
      }
    }
  },

  // 网页初始化时获取购物车数据
  INIT_BUYCART: (state, cartList) => {
    state.cartList = cartList
  },

  // 添加购物车
  ADD_BUYCART: (state, { ivid, num }) => {
    const cartList = state.cartList
    for (let i = 0, len = cartList.length; i < len; i++) {
      if (cartList[i].ivid === ivid) {
        cartList[i].num = cartList[i].num * 1 + num
      }
    }
    state.cartList = cartList
  },

  // 清空当前用户的购物车信息
  CLEAR_BUYCART: (state) => {
    state.cartList = []
  },

  // 更新购物车信息
  UPDATE_BUYCART: (state, {
    num,
    cart_id
  }) => {
    const cartList = state.cartList
    for (let i = 0, len = cartList.length; i < len; i++) {
      if (cartList[i].cart_id === cart_id) {
        cartList[i].num = num
        Vue.set(state.cartList, i, cartList[i])
      }
    }
  },

  CHECKED_BUYCART: (state, id) => {
    const cartList = state.cartList
    for (let i = 0, len = cartList.length; i < len; i++) {
      if (cartList[i].cart_id === id) {
        cartList[i].checked = !cartList[i].checked
        state.cartList.splice(i, 1, cartList[i])
      }
    }
  },

  CHECKED_ALL: (state, flag) => {
    const cartList = state.cartList
    for (let i = 0, len = cartList.length; i < len; i++) {
      cartList[i].checked = flag
    }
    state.cartList = [...cartList]
  },

  SAVE_LOCALSTORAGE: (state, storeList) => {
    storeList = storeList || state.cartList.filter(item => item.checked)
    state.storeList = storeList
    setStore('buyCart', storeList)
  },

  REMOVE_LOCALSTORAGE: state => {
    removeStore('buyCart')
    state.storeList = null
  },

  // 保存支付信息
  SAVE_PAY_ORDER: (state, data) => {
    state.payOrder = data
    setStore('payOrder', data)
  },

  REMOVE_PAY_ORDER: state => {
    removeStore('payOrder')
    state.payOrder = null
  }
}

const actions = {
  // 添加购物车
  addCart({ commit, rootGetters, state }, {
    num,
    ivid
  }) {
    return addShopCart({
      token: rootGetters.token,
      ivid,
      num
    }).then(res => {
      if (res.errcode == 0) {
        commit('ADD_BUYCART', { num, ivid })
      }
    })
  },

  reduceCart({ commit, rootGetters }, { ids }) {
    return deleteCartList({
      token: rootGetters.token,
      cart_ids: ids
    }).then(res => {
      commit('REDUCE_BUYCART', ids)
    })
  },

  initBuyCart({ commit, rootGetters }) {
    const token = rootGetters.token
    if (token) {
      // 登录以后才能查看购物车
      return shopCartList({
        token,
        start_page: 0,
        pages: 100
      }).then(res => {
        const shop = res.data.list[0].list || []
        if (shop.length > 0) {
          commit('INIT_BUYCART', shop)
        } else {
          commit('CLEAR_BUYCART')
        }
      })
    }
  },

  // 清空购物车
  clearCart({ commit, rootGetters }) {
    const { token } = rootGetters
    clearCartList({
      token
    }).then(() => {
      commit('CLEAR_BUYCART')
    })
  },

  // 更新购物车
  updateCart({ commit, rootGetters }, { cart_id, num }) {
    return updateCartList({
      token: rootGetters.token,
      cart_id,
      num
    }).then(() => {
      commit('UPDATE_BUYCART', {
        cart_id,
        num
      })
    })
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}
