<template>
  <v-app>
    <default-header />
		<default-sider />
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
		}
	}
</script>

<style>
</style>