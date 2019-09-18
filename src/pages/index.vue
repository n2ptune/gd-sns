<template>
  <v-content
    :style="`background-image: url(${require('~/assets/test-image.jpg')})`"
    class="background"
  >
    <v-container>
      <span class="mx-auto text-center d-block">
        <v-icon class="mb-4 mr-2" x-large dark>
          mdi-format-line-weight
        </v-icon>
        <span class="text-center white--text display-1">
          GD-SNS
        </span>
      </span>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: 'main'
}
</script>

<style scoped>
.background {
  background: center center;
  background-size: cover;
  display: flex;
  position: fixed;
  overflow: auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>