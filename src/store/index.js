import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import { drizzleObserver$, getCacheKey } from '@/api/drizzleService'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    drizzle
  }
})

console.log('drizzleObserver$', drizzleObserver$)

// Subscribe
let subscription = drizzleObserver$.subscribe({
  next: state => processState(state),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

console.log('subscription', subscription)

const processState = state => {
  console.log(JSON.stringify(state, null, 2))

  // TODO: This will have to be done for all contracts specified in
  // drizzleOptions
  let cache_key
  const method = 'storedData'
  const contract = 'SimpleStorage'

  if (!cache_key && state.drizzleStatus.initialized) {
    console.log('Drizzle is initialized!')
    cache_key = getCacheKey(contract, method)
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
