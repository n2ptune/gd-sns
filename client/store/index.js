import firebase from '~/plugins/firebase.js'
import loadImage from 'blueimp-load-image'

const db = firebase.firestore()
const storage = firebase.storage()

export const strict = false

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
    $nuxt.$router.push('/articles')
    state.btnLoading = !state.btnLoading
  },
  setLoading(state) {
    state.btnLoading = !state.btnLoading
  },
  setDrawing(state) {
    state.drawing = !state.drawing
  },
  setArticles(state, articles) {
    if (state.articles === null) {
      state.articles = articles
    } else {
      state.articles.push(articles)
    }
    state.articles.sort((a, b) => {
      const result = a.aid > b.aid ? -1 : 1
      return result
    })
  },
  clearArticles(state) {
    state.articles = []
  },
  spliceArticle(state, aid) {
    const targetIdx = state.articles.findIndex(el => el.aid === aid)
    state.articles.splice(targetIdx, 1)
  },
  updateArticle(state, aid, __new) {
    const targetIdx = state.articles.findIndex(el => el.aid === aid)
    state.articles[targetIdx] = __new
  }
}

export const actions = {
  // * nuxtServerInit
  nuxtServerInit({ commit }) {
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
  login({ commit }) {
    commit('setLoading')
    // @SEE indexedDB https://www.tutorialdocs.com/article/indexeddb-tutorial.html
    // @SEE indexedDB https://developer.mozilla.org/ko/docs/IndexedDB/Using_IndexedDB
    const dbReq = window.indexedDB.open('firebaseLocalStorageDb')
    dbReq.onerror = async event => {
      await firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
    dbReq.onsuccess = event => {
      const idb = dbReq.result
      const fs = 'firebaseLocalStorage'
      idb
        .transaction(fs)
        .objectStore(fs)
        .openCursor().onsuccess = async event => {
          if (event.target.result)
            commit('setUser', event.target.result.value.value)
          else
            await firebase
              .auth()
              .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        }
    }
  },
  async logout({ commit }) {
    commit('setUser', null)
    await firebase.auth().signOut()
  },
  // images type = FileList
  async draw({ state, commit }, options) {
    // @TODO 게시글 ID 구현 (SAME AS AUTO_INCREMENT)
    // @SEE https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko
    // 게시글 ID Default 값 설정 (=0)
    if (state.user === null) return false
    commit('setDrawing')
    let articleID = 0
    // 규칙 문서 불러오기
    const openRule = db.collection('rules').doc('article')
    // 규칙 문서 데이터 가져오기 (필드 값 currentID)
    await openRule.get().then(doc => {
      // 필드 데이터 검증
      if (doc.exists) {
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
    // 이미지 업로드
    let images = []
    if (options.files !== undefined) {
      const fileLength = options.files.length
      const makeRandomImageName = () => {
        let result = ''
        const possible =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (let i = 0; i < 17; i++) {
          result += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return result
      }

      for (let i = 0; i < fileLength; i++) {
        const file = options.files[i]
        const name = file.name
        // 확장자 분리
        const fileExt = name
          .split('.')
          .slice(-1)
          .toString()
        // 파일 이름 랜덤으로 지정
        const rndName = makeRandomImageName()
        // 파일 이름과 확장자 결합
        const fileName = `images/${rndName}.${fileExt}`
        // 스토리지 참조값 가져오기
        const storageRef = storage.ref()
        // 이미지 넣기
        const r = await storageRef
          .child(fileName)
          .put(file)
          .then(async (s) => {
            // URL 뽑아내기
            const url = await storageRef
              .child(fileName)
              .getDownloadURL()
            images.push({
              ref: fileName,
              url
            })
          })
      }
    }
    const author = {
      name: state.user.displayName,
      email: state.user.email,
      photoURL: state.user.photoURL,
      post: options.text,
      uid: state.user.uid,
      aid: articleID,
      drawtime: firebase.firestore.Timestamp.now(),
      images: images,
      comment: {
        isShow: false,
        data: []
      },
      likes: {
        people: []
      }
    }
    await db.collection('articles').add(author)
    commit('setArticles', author)
    commit('setDrawing')
  },
  // @TODO Vuex 저장하지 않고 컴포넌트에서 가져오기
  async getArticles({ state, commit }, { type }) {
    commit('clearArticles')

    if (type === 'all') {
      await db
        .collection('articles')
        .orderBy('aid', 'desc')
        .get()
        .then(q => {
          q.forEach(async doc => {
            const removeIteration = el => el.aid === doc.data().aid
            if (!state.articles.some(removeIteration)) {
              let data = doc.data()
              const defaultCmtOptions = {
                isShow: false,
                data: []
              }
              data.comment = data.hasOwnProperty('comment') ? data.comment : defaultCmtOptions
              data.likes = data.hasOwnProperty('likes') ? data.likes : { people: [] }
              if (data.hasOwnProperty('images')) {
                for (let i = 0; i < data.images.length; i++) {
                  const url = await storage
                    .ref()
                    .child(data.images[i].ref)
                    .getDownloadURL()
                  data.images[i].url = url
                  loadImage(url, async (img, __data) => {
                    if (img.type === 'error') {
                      console.log('error')
                    } else {
                      try {
                        // 회전 값 저장
                        const ori = await __data.exif.get('Orientation')
                        data.images[i].orientation = ori
                      } catch (e) { }
                    }
                  }, { meta: true })
                }
              }
              commit('setArticles', data)
            }
          })
        })
    } else if(type === 'my') {
      await db
        .collection('articles')
        .where('uid', '==', state.user.uid)
        .get()
        .then(q => {
          q.forEach(async doc => {
            const removeIteration = el => el.aid === doc.data().aid
            if (!state.articles.some(removeIteration)) {
              let data = doc.data()
              const defaultCmtOptions = {
                isShow: false,
                data: []
              }
              data.comment = data.hasOwnProperty('comment') ? data.comment : defaultCmtOptions
              data.likes = data.hasOwnProperty('likes') ? data.likes : { people: [] }
              if (data.hasOwnProperty('images')) {
                for (let i = 0; i < data.images.length; i++) {
                  const url = await storage
                    .ref()
                    .child(data.images[i].ref)
                    .getDownloadURL()
                  data.images[i].url = url
                  loadImage(url, async (img, __data) => {
                    if (img.type === 'error') {
                      console.log('error')
                    } else {
                      try {
                        // 회전 값 저장
                        const ori = await __data.exif.get('Orientation')
                        data.images[i].orientation = ori
                      } catch (e) { }
                    }
                  }, { meta: true })
                }
              }
              commit('setArticles', data)
            }
          })
        })
    }
  },
  deleteArticle({ commit }, aid) {
    db.collection('articles')
      .where('aid', '==', aid)
      .get()
      .then(q => {
        q.forEach(ss =>
          ss.ref.delete().then(result => commit('spliceArticle', aid))
        )
      })
  }
}