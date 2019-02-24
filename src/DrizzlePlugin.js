import drizzleApi from '@/api/drizzleService'
const drizzlePlugin = {
  install(Vue) {
    Vue.drizzleObserver$ = drizzleApi.drizzleObserver$
    Vue.drizzleInstance = drizzleApi.drizzleInstance
    Vue.getCacheKey = drizzleApi.getCacheKey
    Vue.prototype.$getCacheKey = drizzleApi.getCacheKey
  }
}

export default drizzlePlugin
