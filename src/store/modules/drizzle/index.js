const state = {
  contracts: {
    SimpleStorage: {
      storedData: ''
    }
  }
}

const mutations = {
  setData(state, { contract, method, value }) {
    state.contracts[contract][method] = value
  }
}

const actions = {
  updateContractData({ commit }, payload) {
    commit('setData', payload)
  }
}

const getters = {
  getContractData: state => (contract, method) => {
    return state.contracts[contract][method]
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
