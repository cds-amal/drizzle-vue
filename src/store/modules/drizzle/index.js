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
    commit('registerContract', contract)
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
