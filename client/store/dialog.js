export const state = () => ({
  showImage: false
})

export const mutations = {
  setShowImage(state) {
    state.showImage = !state.showImage
  }
}

export const getters = {
  getShowImage: state => {
    return state.showImage
  }
}