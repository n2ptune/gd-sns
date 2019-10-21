import firebase from '@/plugins/firebase'
const db = firebase.firestore()

export const mutations = {}

export const actions = {
  async setLike({ commit }, { uid, article }) {
    const collection = await db.collection('articles')
    const getData = await collection.where('aid', '==', article.aid).get()
    for (const doc of getData.docs) {
      const docData = doc.data()
      let likes = null
      if (docData.hasOwnProperty('likes')) {
        likes = docData.likes
        likes.people.push(uid)
      } else {
        likes = { people: [uid] }
      }
      doc.ref.update({ likes }).then(() => {
        article.likes = likes
        commit('updateArticle', article, { root: true })
      })
    }
  }
}
