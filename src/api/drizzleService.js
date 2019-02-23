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
export const drizzleInstance = new Drizzle(options)

// For the time being, restrict duplicate events. This should go further
// upstream
export const drizzleObserver$ = toObservable(drizzleInstance.store).pipe(distinctUntilChanged(isEqual))

// need to add read and write API here.
// cacheSend that will be called by component create methods

export const getCacheKey = (contractName, method ) =>
  drizzleInstance.contracts[contractName].methods[method].cacheCall()
