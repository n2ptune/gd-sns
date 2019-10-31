<template>
  <v-content style="background-color: #eee;">
    <v-container>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6">
          <div class="headline text-center">Login</div>
          <v-divider class="my-5" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6">
          <v-card>
            <v-card-title class="d-block text-center">
              <v-icon x-large color="primary">mdi-google-plus</v-icon>
            </v-card-title>
            <v-card-text>
              <div class="title black--text">구글 로그인</div>
              <div class="subtitle-1">
                로그인 방식으로 구글 로그인을 채택하고 있습니다. 아이디가 없다면
                <a
                  href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
                  target="_blank"
                >여기</a>를 눌러서 회원가입을 먼저 한 뒤, 아이디가 있으시다면 아래 버튼을 눌러
                로그인을 하세요.
              </div>
              <div class="subtitle-1">로그인 버튼이 보이지 않으시다면 로그인이 이미 된 상태일 수 있습니다.</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="$store.state.user === null"
                @click="login()"
                :loading="$store.state.btnLoading"
                depressed
                outlined
                x-large
                dark
                color="amber darken-4"
                class="ml-auto"
              >login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6">
          <v-btn
            block
            color="white"
            large
            href="https://accounts.google.com/SignUp"
            target="_blank"
          >
            Sign Up With Google
            <v-icon class="ml-2">mdi-google</v-icon>
          </v-btn>
          <div class="subtitle-1 text-center grey--text font-weight-thin my-2">
            <v-icon class="mb-1">mdi-arrow-up</v-icon>구글에서 회원가입
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import firebase from '@/plugins/firebase'

	export default {
    mounted () {
      firebase.auth().getRedirectResult().then(result => {
          if(result.credential) {
            this.$store.commit('setUser', result.user)
          }
        }).catch(e => console.log(e.message))
    },
    methods: {
      login () {
        this.$store.dispatch('login')
      }
    }
  }
</script>