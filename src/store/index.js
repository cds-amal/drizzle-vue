import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import contracts from './modules/contracts'
import drizzlePlugin from '@/DrizzlePlugin'

import { map, distinctUntilChanged, filter } from 'rxjs/operators'
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

let drizzleInitialized = false
const processState = state => {
  /* console.log('Redux State update', state)
   * console.log(
   *   'drizzleInitialized',
   *   drizzleInitialized,
   *   'drizleStatus',
   *   state.drizzleStatus.initialized
   * ) */
  if (!drizzleInitialized) {
    if (state.drizzleStatus.initialized) {
      drizzleInitialized = true
      // console.log('toggled drizzleInitialized', drizzleInitialized)
      store.dispatch('drizzle/initialize')
      // handle cacheKey registration
      // console.log('about to dispatch processRegistrationQueue')
      store.dispatch('drizzle/processRegistrationQueue')
    }
  }
}

const contractsObserver$ = Vue.drizzleObserver$.pipe(
  filter(x => x.drizzleStatus.initialized),
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
      contract: state[contractName]
    })
  }
}

export default store
