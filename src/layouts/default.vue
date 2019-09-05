<template>
  <v-app>
    <default-header />
    <nuxt />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '~/components/DefaultHeader.vue'
import DefaultFooter from '~/components/DefaultFooter.vue'

export default {
  components: {
    'default-header': DefaultHeader,
    'default-footer': DefaultFooter
  }
}
</script>

<style>

</style>