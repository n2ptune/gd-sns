<template>
  <v-content style="background-color: #eee;">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs7>
          <div class="title text-center">
            Login
          </div>
          <v-divider class="my-5" />
        </v-flex>
        <v-flex xs6>
          <v-card>
            <v-card-title class="d-block text-center">
              <v-icon
                x-large
                color="primary"
              >
                mdi-google-plus
              </v-icon>
            </v-card-title>
            <v-card-text>
              <div class="title black--text">
                구글 로그인
              </div>
              <div class="subtitle-1">
                로그인 방식으로 구글 로그인을 채택하고 있습니다. 아이디가 없다면 <a href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp" target="_blank">여기</a>를 눌러서 회원가입을 먼저 한 뒤, 아이디가 있으시다면 아래 버튼을 눌러
                로그인을 하세요.
              </div>
              <div class="subtitle-1">
                로그인 버튼이 보이지 않으시다면 로그인이 이미 된 상태일 수 있습니다.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="$store.state.user === null"
                @click="$store.dispatch('login')"
                :loading="$store.state.btnLoading"
                depressed
                outlined
                x-large
                dark
                color="amber darken-4"
                class="ml-auto"
              >
                login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>