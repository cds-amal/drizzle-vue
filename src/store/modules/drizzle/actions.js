import Vue from 'vue'

export const initialize = ({ commit }) => commit('initialize')

export const REGISTER_CONTRACT = ({ commit }, contract) =>
  commit('REGISTER_CONTRACT', contract)

export const PROCESS_REGISTRATION_Q = ({ commit, dispatch, state }) => {
  const registrationQ = state.registrationQ

  for (let { contractName, method } of registrationQ) {
    const cacheKey = Vue.getCacheKey(contractName, method)
    dispatch(
      'contracts/SET_CACHEKEY',
      {
        contractName,
        method,
        cacheKey
      },
      { root: true }
    )
  }
  commit('EMPTY_REGISTRATION_Q')
}
