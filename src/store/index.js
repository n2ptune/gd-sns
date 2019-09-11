"use strict"

import firebase from '~/plugins/firebase.js'

export const state = () => ({
  btnLoading: false,
  user: null
})

export const mutations = {
  setUser (state, getUser) {
    // 이미 객체가 있을 때
    if(state.user !== null) return (state.user = null)
    state.user = {}
    // 모든 정보를 복사하면 maximum call stack size exceeded 오류 발생
    Object.assign(state.user, getUser.providerData[0])
  },
  setLoading (state) {
    state.btnLoading = !state.btnLoading
  }
}

export const actions = {
  login ({ commit }) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      commit('setUser', result.user)
      commit('setLoading')
    }).catch(e => {
      console.log(e.message)
    })
  },
  logout ({ commit }) {
    commit('setUser', null)
    commit('setLoading')
    firebase.auth().signOut()
  }
}