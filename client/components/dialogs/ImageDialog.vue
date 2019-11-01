<template>
  <v-row justify="center">
    <v-dialog
      :value="getImageFromRef(images.key)"
      width="750px"
      @click:outside="toggleShowValue(images.key)"
      @keydown.esc="toggleShowValue(images.key)"
    >
      <template v-slot:activator="{ on }">
        <div
          class="multiple-photo-text"
          @click.stop="toggleShowValue(images.key)"
        >{{ images.length }}개 이상의 이미지</div>
      </template>
      <v-card>
        <v-card-title>
          <span>이미지 모아보기</span>
          <span class="ml-auto">
            <v-btn icon @click="toggleShowValue(images.key)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </span>
        </v-card-title>
        <v-card-text>
          <v-img
            v-for="(image, index) in images"
            :key="index"
            :src="image.url"
            class="mb-3"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  created() {
    this.connectImageData({
      ref: this.images.key,
      show: this.images.show
    })
  },
  methods: {
    ...mapMutations({
      toggleShowValue: 'dialog/setShowImage',
      connectImageData: 'dialog/pushImageData'
    })
  },
  computed: {
    ...mapGetters({
      getImageFromRef: 'dialog/getImageRef'
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