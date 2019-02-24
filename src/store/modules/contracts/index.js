import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'
import { map, distinctUntilChanged } from 'rxjs/operators'
import { isEqual } from 'lodash'

Vue.use(drizzlePlugin)

const obs$ = Vue.drizzleObserver$.pipe(
  map(x => x.contracts),
  distinctUntilChanged(isEqual)
)
// Subscribe
let subscription = obs$.subscribe({
  next: state => processState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

console.log('subscription', subscription)

const processState = state => {
  console.log(JSON.stringify(state, null, 2))
  console.log('need to dispatch updateContracts, state')
}

const state = {}

const mutations = {
  setData(state, { contract, method, value }) {
    state.contracts[contract][method] = value
  },

  setContracts(state, payload) {
    for (let contract in payload) {
      state[contract] = payload[contract]
    }
  }
}

const actions = {
  updateContractData({ commit }, payload) {
    commit('setData', payload)
  },

  updateContracts({ commit }, payload) {
    commit('setContracts', payload)
  }
}

const getters = {
  getContractData: state => (contract, method) => {
    return state.contracts[contract][method]
  }
}
console.log('in contracts module')
console.log('drizzleInstance', Vue.drizzleInstance)
console.log('drizzleObserver$', Vue.drizzleObserver$)

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
