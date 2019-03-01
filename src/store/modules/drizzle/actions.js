// Bootstrap Action to inject Drizzle instance into state
export const STARTUP = ({ commit }, payload) => commit('STARTUP', payload)

// Drizzle has been initialized
export const INITIALIZE = ({ commit }) => commit('INITIALIZE')

// A component is registering it's contract and method
export const REGISTER_CONTRACT = ({ commit }, paylaod) =>
  commit('REGISTER_CONTRACT', paylaod)

const getCacheKey = (drizzleInstance, contractName, method) =>
  drizzleInstance.contracts[contractName].methods[method].cacheCall()

// get cacheKey for all contracts/methods
export const PROCESS_REGISTRATION_Q = ({
  commit,
  dispatch,
  state,
  rootState
}) => {
  const registrationQ = state.registrationQ
  const { drizzleInstance } = rootState.drizzle

  for (let { contractName, method } of registrationQ) {
    dispatch(
      'contracts/SET_CACHEKEY',
      {
        contractName,
        method,
        cacheKey: getCacheKey(drizzleInstance, contractName, method)
      },
      { root: true }
    )
  }
  commit('EMPTY_REGISTRATION_Q')
}
