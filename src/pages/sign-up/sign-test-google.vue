<template>
  <v-content>
    <v-container>
      
    </v-container>
  </v-content>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  mounted () {
    this.$store.dispatch('login')
  }
}
</script>

<style>

</style>