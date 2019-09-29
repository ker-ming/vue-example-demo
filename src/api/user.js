import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/member/user-api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/member/user-api/info',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/member/user-api/register',
    method: 'post',
    data
  })
}

export function getImgCode(data) {
  return request({
    url: '/member/user-api/get-img-code',
    method: 'post',
    data
  })
}

export function requestCode(data) {
  return request({
    url: '/member/user-api/send-sms',
    method: 'post',
    data
  })
}

export function requestStoreId() {
  return request({
    url: '/shop/shop-api/get-tob-shop',
    method: 'post'
  })
}

export function getOrderCount(data) {
  return request({
    url: '/order/order-api/get-count',
    method: 'post',
    data
  })
}

export function getIdentity(data) {
  return request({
    url: '/member/tob-user-api/get-identity',
    method: 'post',
    data
  })
}
