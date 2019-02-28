import { map, distinctUntilChanged, filter } from 'rxjs/operators'
import { isEqual } from 'lodash'

const subscribe = (obs$, handler) => {
  obs$.subscribe({
    next: message => handler(message),
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`)
  })
}

const drizzleHandler = store => {
  let drizzleInitialized = false
  return message => {
    if (!drizzleInitialized) {
      if (message.drizzleStatus.initialized) {
        drizzleInitialized = true
        store.dispatch('drizzle/initialize')

        // handle cacheKey registration after drizzle is initialized
        // The contracts that need cacheKey resolved were queued to
        // the store at component creation time, which occurs before
        // drizzle initialization.
        //
        store.dispatch('drizzle/processRegistrationQueue')
      }
    }
  }
}

const contractsHandler = store => message => {
  console.log('process Contracts:', message)
  for (let contractName in message) {
    store.dispatch('contracts/updateContract', {
      contractName,
      contract: message[contractName]
    })
  }
}

const createDrizzlePluginFromObserver = drizzleObserver$ => state => {
  const contractsObserver$ = drizzleObserver$.pipe(
    filter(x => x.drizzleStatus.initialized),
    map(x => x.contracts),
    distinctUntilChanged(isEqual)
  )

  const drizzleSub = subscribe(drizzleObserver$, drizzleHandler(state))
  const contractSub = subscribe(contractsObserver$, contractsHandler(state))
}

export default createDrizzlePluginFromObserver
