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

/* // Subscribe
 * let subscription = drizzleObserver$.subscribe({
 *   next: state => processState(state),
 *   error: err => console.log(`Oops... ${err}`),
 *   complete: () => console.log(`Complete!`)
 * })
 *
 * // can unsubscribe
 * setTimeout(() => {
 *   console.log('unsubscribing')
 *   subscription.unsubscribe()
 * }, 15000)
 *
 * console.log('subscription', subscription)
 * console.log('drizzleInstance.contracts', drizzleInstance.contracts)
 *
 * // want to nvoke the 'storedData' contract method
 * //     dataKey: this.contracts[this.props.contract].methods[
 * //        this.props.method
 * //      ].cacheCall(...methodArgs),
 *
 * const processState = state => {
 *   console.log(JSON.stringify(state, null, 2))
 *   if (state.drizzleStatus.initialized) {
 *     console.log('Drizzle is initialized!')
 *     const cache_key = drizzleInstance.contracts.SimpleStorage.methods.storedData.cacheCall()
 *     console.log('cache_key', cache_key)
 *   }
 * } */
