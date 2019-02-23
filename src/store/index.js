import Vue from 'vue'
import Vuex from 'vuex'
import SimpleStorage from './modules/simpleStorage'
import { drizzleObserver$, getCacheKey } from '@/api/drizzleService'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    SimpleStorage
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
// console.log('drizzleInstance.contracts', drizzleInstance.contracts)

const processState = state => {
  console.log(JSON.stringify(state, null, 2))
  let cache_key
  if (!cache_key && state.drizzleStatus.initialized) {
    console.log('Drizzle is initialized!')
    cache_key = getCacheKey('SimpleStorage', 'storedData')
    console.log('cache_key', cache_key)
  }

  let loc = state.contracts.SimpleStorage.storedData[cache_key]
  if (cache_key && loc) {
    console.log('The value is', loc.value)
    store.dispatch('updateStoredData', loc.value)
  }
}

export default store
