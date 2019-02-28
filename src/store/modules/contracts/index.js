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
  getContractData: state => options => {
    const { contract, method, toUtf8, toAscii } = options

    const drizzleInstance = Vue.drizzleInstance
    const web3 = drizzleInstance.web3

    const instance = state.instances[contract]
    const cacheKey = state.cacheKeys[contract]
      ? state.cacheKeys[contract][method]
      : null

    // Reduce multiple states to `loading`
    if (
      cacheKey === null ||
      instance === undefined ||
      !instance.initialized ||
      !web3.utils
    )
      return 'loading'

    const cachedData = instance[method][cacheKey]
    if (cachedData === undefined) return 'loading'

    let { value } = cachedData
    const { hexToUtf8, hexToAscii } = drizzleInstance.web3.utils
    return toUtf8 ? hexToUtf8(value)
      : toAscii   ? hexToAscii(value)
      : value
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
