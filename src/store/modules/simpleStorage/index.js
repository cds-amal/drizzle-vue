const state = {
  storedData: 'local initialization from store'
}

const mutations = {
  setData(state, data) {
    state.storedData = data
  }
}

const actions = {
  updateStoredData({ commit }, payload) {
    commit('setData', payload)
  }
}

const getters = {
  storedData() {
    return state.storedData
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
