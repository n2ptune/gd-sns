<template>
  <v-content>
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <div class="display-1 mt-5" style="margin-bottom: 2rem;">
            회원가입
          </div>
          <v-form ref="signUpForm" v-model="valid">
            <v-text-field :rules="[rules.email, rules.require]" v-model="userId" label="아이디(이메일)" outlined />
            <v-text-field :rules="[rules.counter, rules.require]" v-model="userPw" label="비밀번호" type="password" outlined />
            <v-text-field :rules="[rules.confirm, rules.require, rules.counter]" v-model="userPwConfirm" label="비밀번호 확인" type="password" outlined />
            <v-btn block color="indigo" dark large @click="signUp" class="my-5 title">회원가입</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  data () {
    return {
      valid: false,
      userId: '',
      userPw: '',
      userPwConfirm: '',
      rules: {
        require: v => !!v || '필수로 입력해야 합니다.',
        counter: v => v.length >= 6 || '비밀번호는 6자 이상이여야 합니다.',
        confirm: v => v === this.userPw || '비밀번호 확인을 제대로 입력하세요.',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || '이메일 형식이 맞지 않습니다.'
        },
      }
    }
  },
  methods: {
    signUp () {
      if(this.$refs.signUpForm.validate()) {
        firebase.auth().createUserWithEmailAndPassword(this.userId, this.userPw)
          .then(result => {
            console.log(result)
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        return false
      }
    }
  }
}
</script>