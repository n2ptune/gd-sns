export default function({ store, redirect }) {
  // 인증 필요
  if (!store.state.user) {
    return redirect('/login')
  }
}