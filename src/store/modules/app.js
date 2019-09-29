
const state = {
  device: 'desktop',
  search_value: ''
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SEARCH_VALUE: (state, value) => {
    state.search_value = value
  }
}

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
