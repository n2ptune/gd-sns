import firebase from '~/plugins/firebase.js'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, getUser) {
    // 이미 객체가 있을 때
    if(state.user !== null) return (state.user = null)
    state.user = {}
    Object.assign(state.user, getUser)
    console.log(state.user)
  }
}

export const actions = {
  login ({ commit }) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      commit('setUser', result.user)
    }).catch(e => {
      console.log(e.message)
    })
  },
  logout ({ commit }) {
    commit('setUser', null)
    firebase.auth().signOut()
  }
}