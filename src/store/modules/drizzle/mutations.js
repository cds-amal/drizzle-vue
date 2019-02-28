export const initialize = state => (state.initialized = true)

// Todo: potential Vuex? reactivity here
export const REGISTER_CONTRACT = (state, contract) => {
  state.registrationQ.push(contract)
}

export const EMPTY_REGISTRATION_Q = state => (state.registrationQ = [])
