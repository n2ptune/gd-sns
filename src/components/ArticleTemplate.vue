<template>
  <v-container>
    <v-row justify="center" v-for="article in $store.state.articles" :key="article.aid">
      <v-col cols="12" sm="8" md="6">
        <v-card class="article--container">
          <v-card-title>
            <v-avatar size="28" class="mr-2">
              <img :src="article.photoURL" :alt="article.name" />
            </v-avatar>
            <div class="author--text">
              {{ article.uid === $store.state.user.uid ? '나' : `${article.name}님` }}의 게시글
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
                    @click="articleHandler({ type: item.type, aid: article.aid })"
                  >
                    <v-list-item-title>
                      <strong>{{ item.title }}</strong>
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
            <div class="article--photo-area" v-if="article.images">
              <img v-for="(image, index) in article.images" :key="index" :class="`user-image-${index}`" :src="getImageURL(image, index)" :alt="image">
            </div>
          </v-card-text>
          <v-card-actions>
            <div class="ml-auto">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-charity</v-icon>
                  </v-btn>
                </template>
                <span>공감하기</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-message-plus</v-icon>
                  </v-btn>
                </template>
                <span>댓글</span>
              </v-tooltip>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	export default {
    data () {
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
		mounted() {
		},
		methods: {
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
      async getImageURL(image, index) {
        const url = await this.$firebase.storage().refFromURL(image.url).getDownloadURL().then()
        return url
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
			}
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
</style>