import request from '@/utils/request'
export function requestNotice(data) {
  return request({
    url: '/notice/notice-api/index',
    method: 'post',
    data
  })
}

export function requestCategory() {
  return request({
    url: '/item/me-category-api/get-category-tob',
    method: 'post'
  })
}

export function doYouLike(data) {
  return request({
    url: '/item/me-item-api/like',
    method: 'post',
    data
  })
}

export function searchGoods(data) {
  return request({
    url: '/item/me-item-api/index',
    method: 'post',
    data
  })
}

export function requestBanner(data) {
  return request({
    url: '/banner/banner-api/index',
    method: 'post',
    data
  })
}

export function usePositionList(data) {
  return request({
    url: '/floor/floor-api/get-use-position-list',
    method: 'post',
    data
  })
}

export function getFloorInfo(data) {
  return request({
    url: '/floor/floor-api/get-floor-info',
    method: 'post',
    data
  })
}

export function getGoodsInfo(data) {
  return request({
    url: '/item/me-item-api/view',
    method: 'post',
    data
  })
}

export function getQrcode() {
  return request({
    url: '/item/me-item-api/get-download-qrcode',
    method: 'post'
  })
}

export function requireAllAddress() {
  return request({
    url: '/base/district-api/index',
    method: 'post',
    data: {
      upid: 0,
      data_type: 1
    }
  })
}

export function requestAuth(data) {
  return request({
    url: '/member/tob-user-api/authentication',
    method: 'post',
    data
  })
}
