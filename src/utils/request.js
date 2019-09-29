import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

if (process.env.NODE_ENV === 'development') { // 测试用
  // https://merchant-api-f.netmi.com.cn
  // https://merchant-api-test.netmi.com.cn
  // https://royal-home-test.ysjp2018.com
  axios.defaults.baseURL = '/'
} else {
  axios.defaults.baseURL = window.location.origin
}

// create an axios instance
const service = axios.create({
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.errcode !== 0) {
      if (res.errcode === 10000 || res.errcode === 10001 || res.errcode === 10002 || res.errcode === 10004) {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          Message({
            message: '当前用户未登录',
            showClose: true,
            type: 'warning',
            duration: 5 * 1000
          })
        })
      } else if (res.errcode === 10004) {
        store.dispatch('user/resetToken').then(() => {
          Message({
            message: '异地登录',
            showClose: true,
            type: 'warning',
            duration: 5 * 1000
          })
        })
      } else {
        // 不登录也可以查看一些内容
        Message({
          message: res.errmsg || 'Error',
          type: 'error',
          showClose: true,
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('error:' + error) // for debug
    Message({
      message: error.errmsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
