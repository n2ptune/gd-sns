<template>
  <v-content style="background-color: #eee;">
    <v-container>
      <!-- @TODO columns standard setting default 12, sm 8, md 6 -->
      <v-row justify="center">
        <v-col cols="12" sm="8" class="mb-3">
          <v-card
            elevation="8"
            color="primary darken-2"
            dark
          >
            <v-card-title>
              <div class="title">
                게시글 작성하기
              </div>
            </v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="1">
                  <v-avatar :size="avatarSizeHandler">
                    <img :src="$store.state.user.photoURL" :alt="$store.state.user.displayName">
                  </v-avatar>
                </v-col>
                <v-col cols="10" class="mr-1">
                <v-textarea
                  :rules="[rules.postRule]"
                  v-model="newArticleText"
                  outlined
                  auto-grow
                  color="white"
                  style="font-size: 1.1rem !important;"
                  placeholder="새 글 작성하기"
                  label="새 글"
                ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-item-group class="ml-auto pr-2 pb-2">
                <v-btn
                  :loading="$store.state.drawing"
                  @click="draw"
                  outlined
                  color="dark"
                  x-large
                >작성</v-btn>
              </v-item-group>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- Article Template -->
      <v-row justify="center" v-for="article in $store.state.articles" :key="article.aid">
        <v-col cols="12" sm="8" md="6">
          <v-card class="article--container">
            <v-card-title>
              <v-avatar size="28" class="mr-2">
                <img :src="article.photoURL" :alt="article.name" />
              </v-avatar>
              <div class="author--text">
                {{ article.name }}님의 게시글
                <div
                  class="caption"
                  style="line-height: 0.5rem !important;"
                >{{ stampToDate(article.drawtime) }}</div>
              </div>
              <v-btn icon right class="ml-auto">
                <v-icon color="green accent-4">mdi-tooltip-account</v-icon>
              </v-btn>
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
    head () {
      return {
        title: '게시글 모아보기',
        meta: [
          { name: 'description', content: '게시글 모아보기' }
        ]
      }
    },
    data () {
      return {
        rules: {
          postRule: v => !!v || '빈 내용을 게시할 수 없습니다.'
        },
        newArticleText: ''
      }
    },
		middleware: 'auth',
		mounted() {
			this.$store.dispatch('getArticles')
		},
		methods: {
			makeNewLine(context) {
				return context.replace(/\n/g, '<br />')
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
      async draw () {
        if(this.newArticleText) {
          await this.$store.dispatch('draw', this.newArticleText)
          this.newArticleText = ''
        }
      }
    },
    computed: {
      avatarSizeHandler () {
        switch(this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm': return 24
          case 'md': return 36
          case 'lg': return 48
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
</style>