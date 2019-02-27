import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import contracts from './modules/contracts'
import drizzlePlugin from '@/DrizzlePlugin'

import { map, distinctUntilChanged } from 'rxjs/operators'
import { isEqual } from 'lodash'

Vue.use(drizzlePlugin)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    drizzle,
    contracts
  }
})

// Redux Subscription
let reduxSubscription = Vue.drizzleObserver$.subscribe({
  next: state => processState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

console.log('reduxSubscription', reduxSubscription)

let initialized = false
const processState = state => {
  console.log('Redux State update', state)
  if (!initialized && state.drizzleStatus.initialized) {
    initialized = true
    store.dispatch('drizzle/initialize')
    return
  }

  // handle cacheKey registration
  store.dispatch('/contracts/processRegistrationQueue', contracts)
  /* const contracts = store.getters['drizzle/getRegisteredContracts']
   * for (let { contractName, method } of contracts) {
   *   const cacheKey = Vue.getCacheKey(contractName, method)
   *   store.dispatch('contracts/setCacheKey', {
   *     contractName,
   *     method,
   *     cacheKey
   *   })
   * } */
}

const contractsObserver$ = Vue.drizzleObserver$.pipe(
  map(x => x.contracts),
  distinctUntilChanged(isEqual)
)

// Subscribe
let contractSubscriber = contractsObserver$.subscribe({
  next: state => processContractState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

const processContractState = state => {
  console.log('process Contracts:', state)
  for (let contractName in state) {
    /* console.log(
     *   'DISPATCHING contracts/updateContract',
     *   contractName,
     *   state[contractName]
     * ) */
    store.dispatch('contracts/updateContract', {
      contractName,
      data: state[contractName]
    })
  }
}

export default store
