import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => createPersistedState({
  paths: ['user', 'btnLoading']
})(store)