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



// Todo: Consuming the observable to update state in the modules
// will somehow need to give access to the global store in order to
// dispatch actions
//
// Either use a closure or class to encapsulate the store so it can be
// imported by other state/modules
//
let cache_key
const processState = state => {
  // console.log(JSON.stringify(state, null, 2))
  console.log('drizzle update...')

  // TODO: This will have to be done for all contracts specified in
  // drizzleOptions
  const method = 'storedData'
  const contract = 'SimpleStorage'

  if (!cache_key && state.drizzleStatus.initialized) {
    console.log('Drizzle is initialized!')
    cache_key = Vue.getCacheKey(contract, method)
    console.log('cache_key', cache_key)
  }

  let loc = state.contracts[contract][method][cache_key]
  if (cache_key && loc) {
    console.log('The value is', loc.value)
    store.dispatch('updateContractData', {
      contract,
      method,
      value: loc.value
    })
  }
}

export default store
