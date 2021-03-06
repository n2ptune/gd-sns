import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import Vue from 'vue'

const firebaseConfig = {
  apiKey: 'AIzaSyAkWlXdHfxX6jn4dPf8FODn_iDnNEy7QX0',
  authDomain: 'n2ptune-github-io.firebaseapp.com',
  databaseURL: 'https://n2ptune-github-io.firebaseio.com',
  projectId: 'n2ptune-github-io',
  storageBucket: 'n2ptune-github-io.appspot.com',
  messagingSenderId: '92866541720',
  appId: '1:92866541720:web:9d253eb0d5486348eab8ed'
}

// 객체 덮어쓰지 않기
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
Vue.prototype.$firebase = firebase
export default firebase
