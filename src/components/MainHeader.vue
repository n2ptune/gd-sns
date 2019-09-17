<template>
  <div>
    <v-app-bar
      class="header-bg"
      fixed
      app
      dark
      elevate-on-scroll
      dense
    >
      <v-app-bar-nav-icon class="ml-auto">
        <v-icon
          :large="_sizingIcon"
        >
          mdi-vuejs
        </v-icon>
      </v-app-bar-nav-icon>
      <div
        class="d-inline font-weight-thin"
        :class="_typho"
      >
        Gangdong Univ. SNS
      </div>
      <v-spacer></v-spacer>
      <v-btn
        class="mr-5"
        color="transparent"
        depressed
        dark
        right
        to="/login"
      >login</v-btn>
    </v-app-bar>
    <v-img
      src="https://picsum.photos/2560/1440?random"
      height="600"
      aspect-ratio="1"
    ></v-img>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headTitle: 'GD-SNS',
    }
  },
  mounted () {
  },
  methods: {
    signIn () {
      this.$store.dispatch('login')
      this.$store.commit('setLoading')
    },
    signOut () {
      this.$store.dispatch('logout')
      this.$store.commit('setLoading')
    },
    _typho () {
      return this.$vuetify.breakpoint.name === 'xs' ||
        this.$vuetify.breakpoint.name === 'sm'
        ? 'title'
        : 'headline'
    }
  },
  computed: {
    _sizingIcon () {
      return this.$vuetify.breakpoint.name === 'xs' ||
        this.$vuetify.breakpoint.name === 'sm'
        ? false
        : true
    }
  }
}
</script>

<style>
.header-bg {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
</style>