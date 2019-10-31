<template>
  <v-content style="background-color: #eee;">
    <h3 class="text-center my-5">
      내 게시글 모아보기
    </h3>
    <article-template></article-template>
  </v-content>
</template>

<script>
import ArticleTemplate from '~/components/ArticleTemplate.vue'

export default {
  components: {
    ArticleTemplate
  },
  mounted () {
    this.$store.dispatch('getArticles', { type: 'my' })
  }
}
</script>