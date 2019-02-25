import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'

Vue.use(drizzlePlugin)

const contractState = {
  cacheKeys: {},
  instances: {}
}

const mutations = {
  updateContracts: (state, payload) => {
    console.log('set contracts', payload)
    state.instances = {...payload}
    // for (let contractName in payload) {
      /* console.log(
       *   `state[${contract}] = ${JSON.stringify(payload[contract], null, 2)}`
       * ) */
      // state.instances[contractName] = payload[contractName]
    // }
  },

  setCacheKey: (state, { contractName, method, cacheKey }) => {
    if (!state.cacheKeys[contractName]) state.cacheKeys[contractName] = {}
    state.cacheKeys[contractName][method] = cacheKey
  }
}

const actions = {
  updateContracts: ({ commit }, payload) => commit('updateContracts', payload),

  setCacheKey: ({ commit }, payload) => commit('setCacheKey', payload)
}

const getters = {
  getContractData: (state, _, rootState) => (contract, method) => {
    console.log('GETCONTRACTDATA: rootState', rootState)
    if (!rootState.drizzle.initialized) {
      return 'Drizzle Not initialized'
    }

    if (!state.instances[contract].initialized) {
      return 'Contract not initialized'
    }
    if (!state.instances[contract].synced) {
      return 'Contract not synced'
    }
    const cacheKey = state.cacheKeys[contract]
      ? state.cacheKeys[contract][method]
      : null

    console.log('state', state)
    console.log(`${contract}[${method}] = ${state.instances[contract][method]}`)
    console.log(
      `${contract}[${method}][${cacheKey}] = ${
        state.instances[contract][method][cacheKey]
      }`
    )

    if (cacheKey && state.instances[contract][method][cacheKey]) {
      const contractData = state.instances[contract][method][cacheKey].value
      console.log('ContractData', contractData)
      return contractData
    }

    console.log('NO CONTRACT DATA CACHED YET')
    console.log(JSON.stringify(state))

    return 'ER ME GUD'
  }
}

export default {
  state: contractState,
  actions,
  mutations,
  getters,
  namespaced: true
}
