import { Observable } from 'rxjs'
import { distinctUntilChanged, tap } from 'rxjs/operators'
import { isEqual } from 'lodash'

import { Drizzle } from 'drizzle'
import options from '../drizzleOptions'

/* const toObservable = store => ({
 *   subscribe({ onNext }) {
 *     let dispose = store.subscribe(() => onNext(store.getState()))
 *     onNext(store.getState())
 *     return { dispose }
 *   }
 * }) */

const toObservable = store => {
  return Observable.create(subscriber => {
    let dispose = store.subscribe(() => subscriber.next(store.getState()))
    // subscriber.next(store.getState())
    return { dispose }
  })
}

const drizzle = new Drizzle(options)
console.log('store', drizzle.store)
console.log('drizzle', Object.keys(drizzle))
console.log('drizzle', drizzle)

const obs$ = toObservable(drizzle.store).pipe(
  tap(x => console.log('...'.repeat(22))),
  distinctUntilChanged(isEqual)
)
console.log('obs$', obs$)

let dispose = obs$.subscribe({
  // onNext: state => console.log('onNext: ', JSON.stringify(state, null, 2)),
  next: state => console.log('onNext: ', JSON.stringify(state, null, 2)),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`)
})

setTimeout(() => dispose.dispose(), 5000)

console.log('dispose', dispose)

export default obs$
