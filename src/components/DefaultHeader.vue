<template>
  <v-app-bar
    color="indigo darken-1"
    app
  >
    <v-app-bar-nav-icon>
      <v-icon>
        mdi-voice
      </v-icon>
    </v-app-bar-nav-icon>
    <div>
      {{ headTitle }}
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      headTitle: 'GD-SNS'
    }
  }
}
</script>

<style>

</style>