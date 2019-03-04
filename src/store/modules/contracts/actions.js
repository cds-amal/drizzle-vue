export const UPDATE_CONTRACT = ({ commit }, payload) =>
  commit('UPDATE_CONTRACT', payload)

export const SET_CACHEKEY = ({ commit }, payload) => {
  console.log('SET_CACHEKEY', payload)
  commit('SET_CACHEKEY', payload)
}
