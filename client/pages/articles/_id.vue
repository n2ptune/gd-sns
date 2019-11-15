<template>
  <div :style="{ fontSize: '5rem', marginTop: '64px' }">
    {{ aid }}
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      aid: params.id
    }
  }
}
</script>