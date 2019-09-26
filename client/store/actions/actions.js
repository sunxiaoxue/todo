export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateState', data.num)
    }, data.time)
  }
}
