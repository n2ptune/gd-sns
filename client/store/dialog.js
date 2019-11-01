export const state = () => ({
  showImage: []
})

export const mutations = {
  setShowImage(state, ref) {
    const target = state.showImage.find((arr) => arr.ref === ref)
    target.show = !target.show
  },
  pushImageData(state, image) {
    // image has two key show, ref
    state.showImage.push(image)
  }
}

export const getters = {
  getShowImage: state => {
    return state.showImage
  },
  getImageRef: (state) => (ref) => {
    const target = state.showImage.find(image => image.ref === ref)
    return target.show
  }
}