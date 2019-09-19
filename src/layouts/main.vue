<template>
  <v-app>
    <main-header></main-header>
    <nuxt />
    <main-footer></main-footer>
  </v-app>
</template>

<script>
	import MainHeader from '~/components/MainHeader.vue'
	import MainFooter from '~/components/MainFooter.vue'

	export default {
		components: {
			MainHeader,
			MainFooter
		}
	}
</script>
