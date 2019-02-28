import Vue from 'vue'
import drizzlePlugin from '@/DrizzlePlugin'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(drizzlePlugin)

const state = {
  cacheKeys: {},
  instances: {}
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
