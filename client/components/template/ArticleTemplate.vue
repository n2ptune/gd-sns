<template>
  <v-container>
    <v-row justify="center" v-for="article in $store.state.articles" :key="article.aid">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="article--container">
          <v-card-title>
            <v-avatar size="28" class="mr-2">
              <img :src="article.photoURL" :alt="article.name" />
            </v-avatar>
            <div class="author--text">
              {{
              article.uid === $store.state.user.uid
              ? '나'
              : `${article.name}님`
              }}의 게시글
              <div
                class="caption"
                style="line-height: 0.5rem !important;"
              >{{ stampToDate(article.drawtime) }}</div>
            </div>
            <v-item-group class="ml-auto">
              <v-btn icon>
                <v-icon color="green accent-4">mdi-tooltip-account</v-icon>
              </v-btn>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-if="article.uid === $store.state.user.uid" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="
                      articleHandler({ type: item.type, aid: article.aid })
                    "
                  >
                    <v-list-item-title>
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-item-group>
          </v-card-title>
          <v-card-text>
            <div class="article--area black--text mt-5" v-html="makeNewLine(article.post)"></div>
            <div class="article--photo-area mt-5" v-if="article.images">
              <div class="article--photo-area-multiple" v-if="article.images.length > 1">
                <img v-for="n in 1" :src="article.images[n-1].url" :key="n" class="user-image" />
                <image-dialog :images="imageObjectGenerator(article.images)"></image-dialog>
              </div>
              <div class="article--photo-area-multiple" v-else>
                <img
                  v-for="(image, index) in article.images"
                  :src="image.url"
                  :key="index"
                  class="user-image"
                />
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
						<div class="mr-auto" :style="{ fontSize: '12px' }" v-if="article.likes.people.length !== 0">
							<v-icon size="small" color="red">mdi-heart</v-icon>
							{{ article.likes.people.length }}명이 좋아합니다.
						</div>
            <div class="ml-auto">
              <v-btn
                icon
                @click="setLike(article)"
                :color="likesColorHandler(article.likes.people)"
              >
                <v-icon :color="likesColorHandler(article.likes.people)">mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn icon append>
                <v-icon>mdi-message-plus</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
          <v-card-actions v-if="article.comment.isShow">
            <div>ㅁㄴㅇ</div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import ImageDialog from '@/components/dialogs/ImageDialog'

	export default {
		components: {
			ImageDialog
		},
		data() {
			return {
				items: [
					{
						title: '게시글 삭제',
						icon: 'mdi-delete-forever-outline',
						type: 'Delete'
					},
					{
						title: '게시글 수정',
						icon: 'mdi-pencil-outline',
						type: 'Update'
					}
				]
			}
		},
		mounted() {},
		methods: {
			...mapMutations({
				handleValue: 'dialog/setShowImage',
				pushImageData: 'dialog/pushImageData'
			}),
			makeNewLine(context) {
				return context.replace(/\n/g, '<br/>')
			},
			stampToDate(stamp) {
				const time = new this.$firebase.firestore.Timestamp(
					stamp.seconds,
					stamp.nanoseconds
				).toDate()

				return this.$dayjs(time).fromNow()
			},
			async draw() {
				if (this.dummyPostText) {
					await this.$store.dispatch('draw', this.dummyPostText)
					this.dummyPostText = ''
					this.postDialog = false
				}
			},
			articleHandler({ type, aid }) {
				if (!type || !aid) return
				switch (type) {
					case 'Delete':
						const result = this.$store.dispatch('deleteArticle', aid)
						return
					case 'Update':
						return
				}
			},
			likesColorHandler(people) {
				const isLike = people.find(el => {
					return el === this.$store.state.user.uid
				})
				return isLike ? 'primary' : 'grey'
			},
			setLike(article) {
				// 좋아요 값 가져오기
				const isLike =
					this.likesColorHandler(article.likes.people) === 'primary'
						? true
						: false
				if (isLike) {
					this.$store.dispatch('like/disLike', {
						uid: this.$store.state.user.uid,
						article
					})
				} else {
					this.$store.dispatch('like/setLike', {
						uid: this.$store.state.user.uid,
						article
					})
				}
			},
			imageObjectGenerator(images) {
				const key = images[0].ref
				return Object.assign(images, { key, show: false })
			}
		},
		computed: {
			avatarSizeHandler() {
				switch (this.$vuetify.breakpoint.name) {
					case 'xs':
					case 'sm':
						return 24
					case 'md':
						return 36
					case 'lg':
						return 48
				}
			},
			imageOrientationHandler(orientation) {
				return orientation => {
					return orientation ? 'rotate-90' : ''
				}
			},
			...mapGetters({
				getImageRef: 'dialog/getImageRef'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.author--text {
		font-size: 1rem !important;
	}
	.article--area {
		font-size: 1.25rem !important;
	}
	.user-image {
		width: 100% !important;
		border-radius: 10px !important;
		display: block;
	}
	.article--photo-area {
		position: relative;
	}
</style>
