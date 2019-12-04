import firebase from '../plugins/firebase'

export default function({ store }) {
  const db = firebase.firestore()
  const { uid } = store.state.user

  db.collection('users')
    .where('uid', '==', uid)
    .get()
    .then(result => {
      if (result.empty) {
        db.collection('users').add(store.state.user)
      } else {
        result.docs.forEach(v => {
          const date = new Date()
          v.ref.update({
            visitedAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
          })
        })
      }
    })
}
