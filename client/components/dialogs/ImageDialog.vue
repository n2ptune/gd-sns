<template>
  <v-dialog :value="handle">
    <template v-slot:activator="{ on: multipleImageDialog }">
      <div class="multiple-photo-text" v-on="multipleImageDialog">{{ images.length }}개 이상의 이미지</div>
    </template>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      handleValue: 'dialog/setShowImage'
    }),
    showMultipleImage() {
      this.handleValue()
    }
  },
  computed: {
    ...mapState({
      handle: 'dialog/showImage'
    })
  }
}
</script>

<style lang="scss" scoped>
.multiple-photo-text {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
    font-size: 1rem;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: pointer;
		transition: all 0.5s;

		&:hover {
			background-color: rgba(0, 0, 0, 0.8);
		}
	}
</style>