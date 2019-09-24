import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => createPersistedState({
  paths: ['btnLoading', 'user']
})(store)