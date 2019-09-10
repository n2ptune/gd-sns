import firebase from '~/plugins/firebase.js'

export const state = () => ({
  user: null
})

export const mutations = {
  login (state, user) {
    if(user === null) return (state.user = null)
    state.user = {}
    state.user = {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    }
    console.log(user)
  },
  logout (state) {
    state.user = null
  }
}

export const actions = {
  login () {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
}