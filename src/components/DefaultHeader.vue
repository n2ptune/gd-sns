<template>
  <v-app-bar
    color="success darken-1"
    dark
    app
  >
    <span class="mx-auto">
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-voice
        </v-icon>
      </v-app-bar-nav-icon>
      <span class="title font-weight-regular">
        {{ headTitle }}
      </span>
    </span>
    <v-btn
      @click="signIn"
      v-if="$store.state.user === null ? true : false"
      icon
    >
      <v-icon>
        mdi-login-variant
      </v-icon>
    </v-btn>
    <v-btn
      @click="signOut"
      v-if="$store.state.user === null ? false : true"
      icon
    >
      <v-icon>
        mdi-logout-variant
      </v-icon>
    </v-btn>
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
    },
    signOut () {
    }
  }
}
</script>

<style>

</style>