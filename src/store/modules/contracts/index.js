import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'

Vue.use(drizzlePlugin)

const contractState = {
  cacheKeys: {},
  instances: {}
}

const mutations = {
  updateContract: (state, { contractName, data }) => {
    console.log('contracts/updateContract: contractName', contractName, data)
    state.instances = { ...state.instances, [contractName]: data }
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

  setCacheKey: ({ commit }, payload) => commit('setCacheKey', payload),

/*   processRegistrationQueue: ({ commit, rootState }, contracts) => {
 *     const contracts = store.getters['drizzle/getRegisteredContracts']
 *     const contracts = rootState.drizzle.
 *     for (let { contractName, method } of contracts) {
 *       const cacheKey = Vue.getCacheKey(contractName, method)
 *       commit('contracts/setCacheKey', {
 *         contractName,
 *         method,
 *         cacheKey
 *       })
 *     }
 *
 *   } */
}

const getters = {
  getContractData: state => (contract, method) => {
    const instance = state.instances[contract]
    if (instance === undefined) return 'loading'
    if (!instance.initialized) return 'loading'
    if (!instance.synced) return 'unsynced'

    const cacheKey = state.cacheKeys[contract]
      ? state.cacheKeys[contract][method]
      : null

    if (cacheKey === null) return 'UNCACHED'

    // console.log(`${contract}[${method}] =`, state.instances[contract][method])
    const contractData = state.instances[contract][method][cacheKey].value
    // console.log(`${contract}[${method}] = <${contractData}>`)
    return contractData
  }
}

export default {
  state: contractState,
  actions,
  mutations,
  getters,
  namespaced: true
}
