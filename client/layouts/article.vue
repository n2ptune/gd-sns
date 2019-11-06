<template>
  <v-app :style="{ overflowX: 'hidden' }">
    <default-header />
		<default-sider v-show="handleSider" />
    <nuxt />
  </v-app>
</template>

<script>
	import DefaultHeader from '~/components/DefaultHeader.vue'
	import DefaultSider from '~/components/DefaultSider.vue'

	export default {
		components: {
			DefaultHeader,
			DefaultSider
		},
		computed: {
			handleSider() {
				return this.$vuetify.breakpoint.mdAndUp
			}
		}
	}
</script>

<style>
</style>