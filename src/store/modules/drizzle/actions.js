// Bootstrap Action to inject Drizzle instance into state
export const STARTUP = ({ commit }, payload) => commit('STARTUP', payload)

// Drizzle has been initialized
export const INITIALIZE = ({ commit }) => commit('INITIALIZE')

// A component is registering it's contract and method
export const REGISTER_CONTRACT = ({ commit, dispatch, rootState }, payload) => {
  console.log('REGISTER_CONTRACT', payload)
  commit('REGISTER_CONTRACT', payload)

  if (rootState.drizzle.initialized) {
    dispatch('PROCESS_REGISTRATION_Q')
  }
}

const getCacheKey = (drizzleInstance, contractName, method, methodArgs) =>
  drizzleInstance.contracts[contractName].methods[method].cacheCall(
    ...methodArgs
  )

// get cacheKey for all contracts/methods
export const PROCESS_REGISTRATION_Q = ({
  commit,
  dispatch,
  state,
  rootState
}) => {
  const registrationQ = state.registrationQ
  const { drizzleInstance } = rootState.drizzle

  console.log('PROCESS_REGISTRATION_Q')
  console.log('Q', registrationQ)

  for (let { contractName, method, methodArgs } of registrationQ) {
    dispatch(
      'contracts/SET_CACHEKEY',
      {
        contractName,
        method,
        cacheKey: getCacheKey(drizzleInstance, contractName, method, methodArgs)
      },
      { root: true }
    )
  }
  commit('EMPTY_REGISTRATION_Q')
}
