export const isDrizzleInitialized = state => state.initialized

export const getRegisteredContracts = state => state.registeredContracts

export const drizzleInstance = state => state.drizzleInstance


export const getAbi = state => (contractName, method) => {
  console.log(contractName, method)
  console.log(state.drizzleInstance.contracts)
  console.log(JSON.stringify(state.drizzleInstance.contracts, null, 2))
  return state.drizzleInstance.contracts[contractName].abi//.find(abi => abi.name === method)

}

