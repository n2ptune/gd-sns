<template>
  <div>
    {{ aid }}
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      aid: params.aid
    }
  }
}
</script>