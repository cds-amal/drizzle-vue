import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { isEqual } from 'lodash'

import { Drizzle } from 'drizzle'
import options from '../drizzleOptions'

const toObservable = store =>
  Observable.create(subscriber =>
    store.subscribe(() => subscriber.next(store.getState()))
  )

// Build observable from drizzle store
const drizzleInstance = new Drizzle(options)

// For the time being, restrict duplicate events. This should go further
// upstream
const drizzleObserver$ = toObservable(drizzleInstance.store).pipe(
  distinctUntilChanged(isEqual)
)

const getCacheKey = (contractName, method) =>
  drizzleInstance.contracts[contractName].methods[method].cacheCall()

export default {
  drizzleInstance,
  drizzleObserver$,
  getCacheKey
}
