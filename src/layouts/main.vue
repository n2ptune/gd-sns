<template>
  <v-app>
    <MainHeader></MainHeader>
    <nuxt />
    <DefaultFooter></DefaultFooter>
  </v-app>
</template>

<script>
import MainHeader from '~/components/MainHeader.vue'
import DefaultFooter from '~/components/DefaultFooter.vue'

export default {
  components: {
    MainHeader,
    DefaultFooter
  }
}
</script>
