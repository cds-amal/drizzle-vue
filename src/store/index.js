import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import contracts from './modules/contracts'
import drizzlePlugin from '@/DrizzlePlugin'

Vue.use(drizzlePlugin)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    drizzle,
    contracts
  }
})

// console.log('drizzleInstance', Vue.drizzleInstance)
// console.log('drizzleObserver$', Vue.drizzleObserver$)

// Subscribe
let subscription = Vue.drizzleObserver$.subscribe({
  next: state => processState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

console.log('subscription', subscription)

let initialized = false
const processState = state => {
  console.log('Redux State update', state)
  if (!initialized && state.drizzleStatus.initialized) {
    initialized = true
    store.dispatch('drizzle/initialize')
    const contracts = store.getters['drizzle/getRegisteredContracts']
    // console.log('mst register', store.getters['drizzle/getRegisteredContracts'])
    for (let { contractName, method } of contracts) {
      const cacheKey = Vue.getCacheKey(contractName, method)
      console.log(`cacheKey for ${contractName}[${method}] = ${cacheKey}`)
      store.dispatch('contracts/setCacheKey', {
        contractName,
        method,
        cacheKey
      })
    }
  }
}

import { map, distinctUntilChanged } from 'rxjs/operators'
import { isEqual } from 'lodash'
const obs$ = Vue.drizzleObserver$.pipe(
  map(x => x.contracts),
  distinctUntilChanged(isEqual)
)

// Subscribe
let contractSubscriber = obs$.subscribe({
  next: state => processContractState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

console.log('contractSubscriber', contractSubscriber)

const processContractState = state => {
  console.log('process Contracts')
  // console.log(JSON.stringify(state, null, 2))
  console.log('state', state)
  console.log('DISPATCHING contracts/updateContracts')
  store.dispatch('contracts/updateContracts', state)
}

export default store
