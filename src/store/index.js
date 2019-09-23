import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

/* vuex actions에서 첫번째 인자로 오는 context에 대해서
 * {
 *   state,      // same as store.state, or local state if in modules
 *   rootState,  // same as store.state, only in modules
 *   commit,     // same as store.commit
 *   dispatch,   // same as store.dispatch
 *   getters,    // same as store.getters, or local getters if in modules
 *   rootGetters // same as store.getters, only in modules
 * }
 */

export const state = () => ({
  drawing: false,
  btnLoading: false,
  user: null,
  articles: []
})

export const mutations = {
  setUser(state, getUser) {
    // 이미 객체가 있을 때
    if (state.user !== null) return (state.user = null)
    if (getUser === null) return (state.user = null)
    state.user = {}
    // 모든 정보를 복사하면 maximum call stack size exceeded 오류 발생
    Object.assign(state.user, getUser.providerData[0])
    state.btnLoading = false
  },
  setLoading(state) {
    state.btnLoading = !state.btnLoading
  },
  setDrawing(state) {
    state.drawing = !state.drawing
  },
  setArticles(state, articles) {
    if(state.articles === null) {
      state.articles = articles
    } else {
      state.articles.push(articles)
    }
  }
}

export const actions = {
  // * nuxtServerInit
  nuxtServerInit({ commit }) {
    // 
  },
  login({ commit }) {
    commit('setLoading')
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        commit('setUser', result.user)
        $nuxt.$router.push('/articles')
      })
      .catch(e => {
        console.log(e.message)
      })
    // @SEE https://firebase.google.com/docs/auth/web/auth-state-persistence
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //   .then(result => {
    //     return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //       .then(result => {
    //         commit('setUser', result.user)
    //         console.log(result.user)
    //       })
    //   })
  },
  logout({ commit }) {
    commit('setLoading')
    commit('setUser', null)
    firebase.auth().signOut()
  },
  async draw({ state, commit }, text) {
    // @TODO 게시글 ID 구현 (SAME AS AUTO_INCREMENT)
    // @SEE https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko
    // 게시글 ID Default 값 설정 (=0)
    if(state.user === null) return false
    commit('setDrawing')
    let articleID = 0
    // 규칙 문서 불러오기
    const openRule = db.collection('rules').doc('article')
    // 규칙 문서 데이터 가져오기 (필드 값 currentID)
    await openRule.get().then((doc) => {
      // 필드 데이터 검증
      if(doc.exists) {
        // 데이터 불러오기
        const data = doc.data()
        // 값을 가져오고 규칙 값 증가시키기
        articleID = data.currentID
        openRule.update({
          currentID: articleID + 1
        })
      } else {
        // @TEST
        console.log('실패')
      }
    })
    const author = {
      name: state.user.displayName,
      email: state.user.email,
      photoURL: state.user.photoURL,
      post: text,
      uid: state.user.uid,
      aid: articleID,
      drawtime: firebase.firestore.Timestamp.now()
    }
    await db.collection('articles').add(author)
    commit('setDrawing')
  },
  async getArticles({ state, commit }) {
    await db.collection('articles')
      .orderBy('aid', 'desc')
      .get()
      .then((q) => {
        q.forEach((doc) => {
          const removeIteration = (el) => {
            return el.aid === doc.data().aid
          }
          if(!state.articles.some(removeIteration)) {
            commit('setArticles', doc.data())
          }
      })
    })
  }
}
