import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { Drizzle } from 'drizzle'
import options from '../drizzleOptions'

const toObservable = store => ({
  subscribe({ onNext }) {
    let dispose = store.subscribe(() => onNext(store.getState()))
    onNext(store.getState())
    return { dispose }
  }
})

const drizzle = new Drizzle(options)
console.log('store', drizzle.store)
console.log('drizzle', Object.keys(drizzle))
console.log('drizzle', drizzle)

const obs = toObservable(drizzle.store)
console.log('obs', obs)

obs
  .subscribe({
  onNext: state => console.log('onNext: ', JSON.stringify(state, null, 2)),
  error: err => console.log(`Oops... ${err}`),
  complete: () => console.log(`Complete!`),
})

export default obs
