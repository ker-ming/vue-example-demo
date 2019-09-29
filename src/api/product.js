import request from '@/utils/request'
// 获取商品列表
export function requestGoods(data) {
  return request({
    url: '/item/me-item-api/index',
    method: 'post',
    data
  })
}

// 获取分类
export function requestCategory() {
  return request({
    url: '/item/me-category-api/get-category',
    method: 'post'
  })
}

// 获取商品详情
export function requestDetail(data) {
  return request({
    url: '/item/me-item-api/view',
    method: 'post',
    data
  })
}

// 获取商品规格
export function requestProperty(data) {
  return request({
    url: '/item/me-item-api/get-property',
    method: 'post',
    data
  })
}

// 获取商品全部规格
export function requestAllProperty(data) {
  return request({
    url: '/item/me-item-api/get-all-property',
    method: 'post',
    data
  })
}

// 添加到购物车
export function addShopCart(data) {
  return request({
    url: '/item/me-cart-api/create',
    method: 'post',
    data
  })
}

// 购物车列表
export function shopCartList(data) {
  return request({
    url: '/item/me-cart-api/index',
    method: 'post',
    data
  })
}

// 更新购物车
export function updateCartList(data) {
  return request({
    url: '/item/me-cart-api/update',
    method: 'post',
    data
  })
}

// 删除购物车
export function deleteCartList(data) {
  return request({
    url: '/item/me-cart-api/delete',
    method: 'post',
    data
  })
}

// 清空购物车
export function clearCartList(data) {
  return request({
    url: '/item/me-cart-api/delete-all',
    method: 'post',
    data
  })
}

// 订单下单
export function createOrder(data) {
  return request({
    url: '/order/order-api/create',
    method: 'post',
    data
  })
}

// 订单列表
export function requestOrderList(data) {
  return request({
    url: '/order/order-api/main-order-list',
    method: 'post',
    data
  })
}

// 订单详情
export function requestOrderInfo(data) {
  return request({
    url: '/order/order-api/main-order-info',
    method: 'post',
    data
  })
}

// 删除订单
export function removeOrder(data) {
  return request({
    url: '/order/order-api/main-delete',
    method: 'post',
    data
  })
}

// 确认收货
export function confirmOrder(data) {
  return request({
    url: '/order/order-api/confirm',
    method: 'post',
    data
  })
}

// 查看线下支付信息
export function checkPayInfo(data) {
  return request({
    url: '/pay/pay-api/offline-info',
    method: 'post',
    data
  })
}

// 查看物流
export function requestExpress(data) {
  return request({
    url: '/order/order-api/logistics',
    method: 'post',
    data
  })
}

// 地址列表
export function requestAddress(data) {
  return request({
    url: '/shop/me-address-api/index',
    method: 'post',
    data
  })
}

// 用户余额
export function userBalance(data) {
  return request({
    url: '/member/user-api/pay-balance',
    method: 'post',
    data
  })
}

// 余额支付
export function payUseBalance(data) {
  return request({
    url: '/pay/pay-api/balance',
    method: 'post',
    data
  })
}

// 线下支付
export function payUseOffline(data) {
  return request({
    url: '/pay/pay-api/offline',
    method: 'post',
    data
  })
}

// 移动支付下单
export function payUseApp(data) {
  return request({
    url: '/pay/pay-api/app',
    method: 'post',
    data
  })
}

// JSAPI 支付
export function payUseJs(data) {
  return request({
    url: '/pay/pay-api/js-api',
    method: 'post',
    data
  })
}

// 线下支付银行信息
export function requestPayBank(data) {
  return request({
    url: '/base/intel-api/bank-info',
    method: 'post',
    data
  })
}
