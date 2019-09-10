<template>
  <v-app-bar
    color="success darken-1"
    dark
    app
  >
    <span class="mx-auto">
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-voice
        </v-icon>
      </v-app-bar-nav-icon>
      <span class="title font-weight-regular">
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