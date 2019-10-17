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
                          <div class="caption" style="line-height: 0.5rem !important;">몇 초 전</div>
                        </div>
                        <v-item-group class="ml-auto">
                          <v-btn icon>
                            <v-icon color="green accent-4">mdi-tooltip-account</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </v-item-group>
                      </v-card-title>
                      <v-card-text>
                        <div
                          class="black--text article--area-text mt-5"
                          v-html="makeNewLine(dummyPostText)"
                        ></div>
                        <div class="article--area-dummy mt-5"></div>
                      </v-card-text>
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
                  <v-col cols="12">
                    <div class="d-flex justify-center">
                      <input
                        type="file"
                        multiple
                        ref="imageUpload"
                        accept="image/*"
                        @change="handleImageUpload()"
                        style="display: none;"
                      />
                      <v-btn icon dark @click="$refs.imageUpload.click()">
                        <v-icon>mdi-image-plus</v-icon>
                      </v-btn>
                    </div>
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
                <v-btn small icon text fab @click="postDialog = true">
                  <v-icon>mdi-newspaper-plus</v-icon>
                </v-btn>
                <v-tooltip top transition="scale-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon text fab v-on="on">
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
      <article-template></article-template>
    </v-container>
  </v-content>
</template>

<script>
	import ArticleTemplate from '~/components/ArticleTemplate.vue'

	export default {
		components: {
			ArticleTemplate
		},
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
				}
			}
		},
		middleware: 'auth',
		mounted() {
			this.$store.dispatch('getArticles')
		},
		methods: {
			async draw() {
				if (this.dummyPostText) {
					const options = {
						text: this.dummyPostText,
						files: this.$refs.imageUpload.files
					}
					await this.$store.dispatch('draw', options)
					this.dummyPostText = ''
					this.postDialog = false
				}
			},
			makeNewLine(context) {
				return context.replace(/\n/g, '<br/>')
			},
			handleImageUpload() {
				const files = this.$refs.imageUpload.files
				const preview = document.getElementsByClassName('article--area-dummy')[0]

				for (let i = 0; i < files.length; i++) {
					const file = files[i]

					const img = document.createElement('img')
					img.classList.add('img-obj')
					img.file = file

					preview.appendChild(img)

					const reader = new FileReader()
					reader.onload = (function(aImg) {
						return function(e) {
							aImg.src = e.target.result
						}
					})(img)
					reader.readAsDataURL(file)
				}
			}
		}
	}
</script>

<style lang="scss">
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
	.img-obj {
		margin-right: 10px;
		margin-left: 10px;
		width: 120px;
		height: 120px;
	}
</style>