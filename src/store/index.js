import Vue from 'vue'
import Vuex from 'vuex'
import SimpleStorage from './modules/simpleStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    SimpleStorage
  }
})
