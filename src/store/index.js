import Vue from 'vue'
import Vuex from 'vuex'
import drizzle from './modules/drizzle'
import contracts from './modules/contracts'
import drizzlePlugin from '@/DrizzlePlugin'
import drizzleVuexPlugin from './DrizzleVuexPlugin'

Vue.use(drizzlePlugin)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    drizzle,
    contracts
  },
  plugins: [drizzleVuexPlugin(Vue.drizzleObserver$)]
})

export default store
