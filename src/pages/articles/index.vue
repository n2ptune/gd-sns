<template>
  <v-content style="background-color: #eee;">
    <v-container>
      <v-row justify="center">
        <!-- dialog -->
        <v-dialog
          v-model="postDialog"
          hide-overlay
          fullscreen
          transition="dialog-bottom-transition"
          dark
        >
          <v-card>
            <v-app-bar dark tile title="새 게시글 작성하기" class="app-bar-gradient">
              <v-app-bar-nav-icon>
                <v-icon>mdi-newspaper-variant</v-icon>
              </v-app-bar-nav-icon>

              <div class="title">새 게시글 작성하기</div>

              <div class="flex-grow-1"></div>

              <v-btn icon text @click="postDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-title>
              <p class="text-center mx-auto body-1">
                <v-icon>mdi-bookmark-check</v-icon>작성할 내용을 입력하세요.
              </p>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-col cols="12" sm="8" md="6">
                    <v-textarea
                      v-model="dummyPostText"
                      :rules="[rules.postRule]"
                      label="새 게시글에 대한 내용"
                      outlined
                      auto-grow
                      rows="6"
                      placeholder="무슨 생각을 하고 계신가요?"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-card class="article--container" elevation="24" light>
                      <v-card-title>
                        <v-avatar size="28" class="mr-2">
                          <img :src="$store.state.user.photoURL" />
                        </v-avatar>
                        <div class="author--text">
                          나의 게시글
                          <div
                            class="caption"
                            style="line-height: 0.5rem !important;"
                          >{{ dummyDate() }}</div>
                        </div>
                        <v-item-group class="ml-auto">
                          <v-btn icon>
                            <v-icon color="green accent-4">mdi-tooltip-account</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon color="green accent-4">mdi-dots-vertical</v-icon>
                          </v-btn>
                        </v-item-group>
                      </v-card-title>
                      <v-card-text
                        class="black--text article--area mt-5"
                        v-html="makeNewLine(dummyPostText)"
                      ></v-card-text>
                      <v-card-actions>
                        <div class="ml-auto">
                          <v-btn icon>
                            <v-icon>mdi-charity</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>mdi-message-plus</v-icon>
                          </v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="8" md="4" class="mt-8">
                    <v-btn
                      :loading="$store.state.drawing"
                      @click="draw"
                      block
                      color="pink darken-2"
                      dark
                    >이대로 작성하기</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-col cols="12" sm="6">
          <v-card flat color="transparent">
            <v-card-text class="text-center">
              <div class="btn-group">
                <v-tooltip top transition="scale-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon text fab v-on="on" @click="postDialog = true">
                      <v-icon>mdi-newspaper-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>새 게시글 작성</span>
                </v-tooltip>
                <v-tooltip top transition="scale-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon text fab v-on="on" @click>
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>아티클 새로고침</span>
                </v-tooltip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
            <v-card-text class="black--text article--area mt-5" v-html="makeNewLine(article.post)"></v-card-text>
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
  </v-content>
</template>

<script>
	export default {
		head() {
			return {
				title: '게시글 모아보기',
				meta: [{ name: 'description', content: '게시글 모아보기' }]
			}
		},
		data() {
			return {
				dummyPostText: '',
				postDialog: false,
				rules: {
					postRule: v => !!v || '빈 내용을 게시할 수 없습니다.'
				},
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
		middleware: 'auth',
		mounted() {
			this.$store.dispatch('getArticles')
		},
		methods: {
			makeNewLine(context) {
				return context.replace(/\n/g, '<br/>')
			},
			stampToDate(stamp) {
				// @SEE https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
				const options = {
					dateStyle: 'full',
					timeStyle: 'short',
					hour12: false
				}
				// @NEED_RESOLVE Can't show and overflow text at iphone
				// @RESOLVE overflow text at iphone with font-family-apple-system-
				return new Date(
					new this.$firebase.firestore.Timestamp(
						stamp.seconds,
						stamp.nanoseconds
					).toDate()
				).toLocaleDateString('ko-KR', options)
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
						// if(result) success code
						// else failed code
						return
					case 'Update':
						return
				}
			},
			dummyDate() {
				const date = new Date()
				return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
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
	textarea {
		line-height: 1.45rem;
	}
	.app-bar-gradient {
		background-image: linear-gradient(
			65.8deg,
			rgba(215, 17, 73, 1) 18.5%,
			rgba(195, 19, 69, 1) 91.8%
		);
		border-radius: 0 !important;
	}
</style>