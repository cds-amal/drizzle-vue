import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import obs from './api/drizzleService'

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
