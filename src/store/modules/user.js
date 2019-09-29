import { login, logout, getInfo, register } from '@/api/user'
import { getLevel, setLevel, getUserData, setUserData, getToken, setToken, setUid, getUid, removeToken, getName, getAvatar, setName, setAvatar, setPhone, setShopId, getPhone, getShopId } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getName(),
  avatar: getAvatar(),
  phone: getPhone(),
  shop_id: getShopId(),
  uid: getUid(),
  level: getLevel()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_SHOP_ID: (state, id) => {
    state.shop_id = id
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_IDENTITY: (state, identity) => {
    state.tob_identity = identity
  },
  SET_LEVEL: (state, level) => {
    state.level = level
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { code, phone, scenario, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        phone,
        code,
        scenario,
        password
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token.token)
        commit('SET_NAME', data.nickname)
        commit('SET_AVATAR', data.head_url)
        commit('SET_PHONE', data.phone)
        commit('SET_UID', data.uid)
        commit('SET_LEVEL', data.level_name)

        setLevel(data.level_name)
        setToken(data.token.token)
        setName(data.nickname)
        setAvatar(data.head_url)
        setPhone(data.phone)
        setUid(data.uid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, userInfo) {
    const { phone, code, scenario, password } = userInfo
    return new Promise((resolve, reject) => {
      register({
        phone,
        code,
        scenario,
        password
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token.token)
        commit('SET_NAME', data.nickname)
        commit('SET_AVATAR', data.head_url)
        commit('SET_PHONE', data.phone)
        commit('SET_UID', data.uid)
        setToken(data.token.token)
        setName(data.nickname)
        setAvatar(data.head_url)
        setPhone(data.phone)
        setUid(data.uid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, phone } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PHONE', phone)
        setName(name)
        setAvatar(avatar)
        setPhone(phone)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      // resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  setShopId({ commit }, payload) {
    commit('SET_SHOP_ID', payload)
    setShopId(payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

