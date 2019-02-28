import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'

Vue.use(drizzlePlugin)

const state = {
  cacheKeys: {},
  instances: {}
}

const mutations = {
  updateContract: (state, { contractName, contract }) => {
    state.instances = { ...state.instances, [contractName]: contract }
  },

  setCacheKey: (state, { contractName, method, cacheKey }) => {
    const pair = { [method]: cacheKey }
    if (!state.cacheKeys[contractName]) {
      state.cacheKeys = { ...state.cacheKeys, [contractName]: { ...pair } }
    } else {
      state.cacheKeys[contractName] = {
        ...state.cacheKeys[contractName],
        ...pair
      }
    }
  }
}

const actions = {
  updateContract: ({ commit }, payload) => commit('updateContract', payload),

  setCacheKey: ({ commit }, payload) => commit('setCacheKey', payload)
}

const getters = {
  isStale: state => contract => !state.instances[contract].synced,

  getContractData: state => (contract, method) => {
    const instance = state.instances[contract]
    const cacheKey = state.cacheKeys[contract]
      ? state.cacheKeys[contract][method]
      : null

    if (cacheKey === null || instance === undefined || !instance.initialized)
      return 'loading'

    const cachedData = instance[method][cacheKey]
    if (cachedData === undefined) return 'loading'

    return instance[method][cacheKey].value
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
