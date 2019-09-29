import request from '@/utils/request'

export function collection(data) {
  return request({
    url: '/item/me-item-collection-api/collection',
    method: 'post',
    data
  })
}

export function delCollection(data) {
  return request({
    url: '/item/me-item-collection-api/del-collection',
    method: 'post',
    data
  })
}

export function getProperty(data) {
  return request({
    url: '/item/me-item-api/get-property',
    method: 'post',
    data
  })
}

export function getAllProperty(data) {
  return request({
    url: '/item/me-item-api/get-all-property',
    method: 'post',
    data
  })
}

export function requestComment(data) {
  return request({
    url: '/item/me-commet-api/index',
    method: 'post',
    data
  })
}

export function addCart(data) {
  return request({
    url: '/item/me-cart-api/create',
    method: 'post',
    data
  })
}

export function removeCart(data) {
  return request({
    url: '/item/me-cart-api/delete',
    method: 'post',
    data
  })
}

export function clearCart(data) {
  return request({
    url: '/item/me-cart-api/delete-all',
    method: 'post',
    data
  })
}

export function updateCart(data) {
  return request({
    url: '/item/me-cart-api/update',
    method: 'post',
    data
  })
}

export function getCartList(data) {
  return request({
    url: '/item/me-cart-api/index',
    method: 'post',
    data
  })
}

export function myAddress(data) {
  return request({
    url: '/shop/me-address-api/index',
    method: 'post',
    data
  })
}

export function createOrder(data) {
  return request({
    url: '/order/order-api/create',
    method: 'post',
    data
  })
}

export function getConponList(data) {
  return request({
    url: '/coupon/coupon-api/index',
    method: 'post',
    data
  })
}

export function getUserScore(data) {
  return request({
    url: '/member/user-coin-api/get-my-coin',
    method: 'post',
    data
  })
}

export function payByMini(data) {
  return request({
    url: '/pay/pay-api/mini',
    method: 'post',
    data
  })
}

export function payByBalance(data) {
  return request({
    url: '/pay/pay-api/balance',
    method: 'post',
    data
  })
}

export function payByMobile(data) {
  return request({
    url: '/pay/pay-api/app',
    method: 'post',
    data
  })
}

export function payReset(data) {
  return request({
    url: '/pay/pay-api/main-reset-order',
    method: 'post',
    data
  })
}
