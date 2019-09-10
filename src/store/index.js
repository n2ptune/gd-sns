import firebase from '~/plugins/firebase.js'

export const state = () => ({
  user: null
})

export const mutations = {
  login (state, user) {
    state.user = user
  },
  logout (state) {
    state.user = null
  }
}

export const actions = {
  async login ({ commit }) {
    await firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    firebase.auth().getRedirectResult().then(result => {
      // commit('login', result)
      console.log(result)
    })
  }
}