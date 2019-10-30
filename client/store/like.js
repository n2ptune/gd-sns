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
  },
  async disLike({ commit }, { uid, article }) {
    const collection = await db.collection('articles')
    const getData = await collection.where('aid', '==', article.aid).get()
    for (const doc of getData.docs) {
      const docData = doc.data()
      
      let people = docData.likes.people
      const targetIndex = people.findIndex((el) => el === uid)
      people.splice(targetIndex, 1)
      
      doc.ref.update({ 'likes.people': people }).then(() => {
        article.likes.people = people
        commit('updateArticle', article, { root: true })
      })
    }
  }
}
