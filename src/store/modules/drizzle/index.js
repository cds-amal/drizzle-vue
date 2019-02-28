import Vue from 'vue'

const drizzleState = {
  initialized: false,
  // These contracts need cacheCall invoked on them
  // when drizzle is initialized
  //
  registrationQ: []
}

const mutations = {
  initialize: state => (state.initialized = true),

  // Todo: potential Vuex? reactivity here
  registerContract: (state, contract) => {
    console.log('Registering:', contract)
    state.registrationQ.push(contract)
  },

  clearRegistrationQueue: state => (state.registrationQ = [])
}

const actions = {
  initialize: ({ commit }) => commit('initialize'),

  registerContract: ({ commit }, contract) => {
    commit('registerContract', contract)
  },

  processRegistrationQueue: ({ commit, dispatch, state }) => {
    const registrationQ = state.registrationQ
    for (let { contractName, method } of registrationQ) {
      const cacheKey = Vue.getCacheKey(contractName, method)
      dispatch(
        'contracts/setCacheKey',
        {
          contractName,
          method,
          cacheKey
        },
        { root: true }
      )
    }
    commit('clearRegistrationQueue')
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
