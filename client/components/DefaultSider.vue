<template>
  <v-navigation-drawer
    app
    clipped
    right
    color="transparent"
    floating
    width="185px"
    height="110vh"
    :mobile-break-point="1000"
    class="pt-5 pl-3"
  >
    <friends-avatar
      :friends="friends"
      subheading="친구 목록"
    ></friends-avatar>
  </v-navigation-drawer>
</template>

<script>
	import FriendsAvatar from '@/components/template/FriendsAvatar.vue'

	export default {
		components: {
			FriendsAvatar
    },
    data() {
      return {
        friends: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        const target = document.querySelector('.v-navigation-drawer__content')
        target.classList.add('not-scroll-bar')
      })
    }
	}
</script>
