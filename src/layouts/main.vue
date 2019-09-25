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
  import _image from '~/assets/gangdong.png'

	export default {
    head () {
      return {
        meta: [
          { property: 'og:image', content: _image }
        ]
      }
    },
		components: {
			MainHeader,
			MainFooter
		}
	}
</script>
