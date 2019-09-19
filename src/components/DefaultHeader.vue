<template>
  <v-app-bar color="success darken-1" dark app>
    <span class="app-bar-header">
      <v-btn to="/" icon>
        <v-icon>mdi-home-account</v-icon>
      </v-btn>
      <span class="title font-weight-regular py-auto">{{ headTitle }}</span>
    </span>
    <span class="ml-auto">
      <v-btn
        :loading="$store.state.btnLoading"
        @click="signIn"
        v-if="$store.state.user === null ? true : false"
        icon
      >
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn fab icon v-if="$store.state.user === null ? false : true" to="/profile">
        <v-avatar size="36">
          <img :src="$store.state.user.photoURL" :alt="$store.state.user.displayName" />
        </v-avatar>
      </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
	export default {
		data() {
			return {
				headTitle: 'GD-SNS'
			}
		},
		mounted() {},
		methods: {
			signIn() {
				this.$store.dispatch('login')
			},
			signOut() {
				this.$store.dispatch('logout')
			}
		}
	}
</script>

<style>
</style>