import Vue from 'vue'

const drizzleState = {
  initialized: false,
  // These contracts need cacheCall invoked on them
  // when drizzle is initialized
  //
  registeredContracts: []
}

const mutations = {
  initialize: state => (state.initialized = true),

  registerContract: (state, contract) =>
    state.registeredContracts.push(contract)
}

const actions = {
  initialize: ({ commit }) => commit('initialize'),

  registerContract: ({ commit }, contract) =>
  commit('registerContract', contract),

  processRegistrationQueue: ({ commit, state }, contracts) => {
    const registeredContracts = state.registeredContracts
    for (let { contractName, method } of contracts) {
      const cacheKey = Vue.getCacheKey(contractName, method)
      commit('contracts/setCacheKey', {
        contractName,
        method,
        cacheKey
      })
    }

  }
}

const getters = {
  isDrizzleInitialized: state => state.initialized,
  getRegisteredContracts: state => state.registeredContracts
}

export default {
  state: drizzleState,
  actions,
  mutations,
  getters,
  namespaced: true
}
