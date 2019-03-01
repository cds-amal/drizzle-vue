import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import contracts from './modules/contracts'
import { Drizzle } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import drizzleVuexPlugin from './DrizzleVuexPlugin'

Vue.use(Vuex)

const drizzleInstance = new Drizzle(drizzleOptions)

const store = new Vuex.Store({
  modules: {
    drizzle,
    contracts
  },
  plugins: [drizzleVuexPlugin(drizzleInstance)]
})

store.dispatch('drizzle/STARTUP', drizzleInstance)

export default store
