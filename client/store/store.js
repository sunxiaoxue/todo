import Vuex from 'vuex'
import defafullState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
export default () => {
  return new Vuex.Store({
    state: defafullState,
    mutations: mutations,
    getters,
    actions
  })
}
