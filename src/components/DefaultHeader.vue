<template>
  <v-app-bar
    color="success darken-1"
    dark
    app
  >
    <span class="app-bar-header">
      <v-btn
        to="/"
        icon
      >
        <v-icon>
          mdi-home-account
        </v-icon>
      </v-btn>
      <span class="title font-weight-regular py-auto">
        {{ headTitle }}
      </span>
    </span>
    <span class="ml-auto">
      <v-btn
        :loading="$store.state.btnLoading"
        @click="signIn"
        v-if="$store.state.user === null ? true : false"
        icon
      >
        <v-icon>
          mdi-login-variant
        </v-icon>
      </v-btn>
      <v-btn
        :loading="$store.state.btnLoading"
        @click="signOut"
        v-if="$store.state.user === null ? false : true"
        icon
      >
        <v-icon>
          mdi-logout-variant
        </v-icon>
      </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
import firebase, { auth } from '~/plugins/firebase.js'

export default {
  data () {
    return {
      headTitle: 'GD-SNS',
    }
  },
  mounted () {
  },
  methods: {
    signIn () {
      this.$store.dispatch('login')
      this.$store.commit('setLoading')
    },
    signOut () {
      this.$store.dispatch('logout')
      this.$store.commit('setLoading')
    }
  }
}
</script>

<style>

</style>