export const isDrizzleInitialized = state => state.initialized

export const getRegisteredContracts = state => state.registeredContracts

export const getContractABI = state  => (contract, methodName) => {
  console.log('getContractABI...')
  const abi = state.drizzleInstance.contracts[contract].abi
    .find(fn => fn.name === methodName)
  return abi
}

