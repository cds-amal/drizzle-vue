import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'

Vue.use(drizzlePlugin)

const state = {
  cacheKeys: {},
  instances: {}
}

const mutations = {
  updateContract: (state, { contractName, contract }) => {
    /* console.log(
     *   'contracts/updateContract: contractName',
     *   contractName,
     *   contract
     * )
     * console.log(JSON.stringify(contract, null, 2)) */
    state.instances = { ...state.instances, [contractName]: contract }
  },

  setCacheKey: (state, { contractName, method, cacheKey }) => {
    const pair = { [method]: cacheKey }
    /* console.log('mutation.setCacheKey:', contractName, method, cacheKey) */
    if (!state.cacheKeys[contractName]) {
      state.cacheKeys = { ...state.cacheKeys, [contractName]: { ...pair } }
    } else {
      state.cacheKeys[contractName] = {
        ...state.cacheKeys[contractName],
        ...pair
      }
    }
    /* console.log('updatedState', state) */
  }
}

const actions = {
  updateContract: ({ commit }, payload) => commit('updateContract', payload),

  setCacheKey: ({ commit }, payload) => commit('setCacheKey', payload)
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

    const cachedData = instance[method][cacheKey]
    if (cachedData === undefined) {
      console.log('cachedData is unavailable')
      return 'UNCASHED'
    }

    /* console.log(`${contract}[${method}] =`, instance[method])
     * console.log(
     *   `${contract}[${method}][${cacheKey}] =`,
     *   JSON.stringify(instance[method][cacheKey], null, 2)
     * ) */
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
