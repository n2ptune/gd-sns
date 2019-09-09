<template>
  <v-app-bar
    color="indigo darken-1"
    app
  >
    <span class="mx-auto">
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-voice
        </v-icon>
      </v-app-bar-nav-icon>
      <span>
        {{ headTitle }}
      </span>
    </span>
    <v-btn
      icon
    >
      <v-icon>
        mdi-login-variant
      </v-icon>
    </v-btn>
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