import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + '강동대학교 SNS',
    title: '강동대학교 SNS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index,follow' },
      {
        hid: 'description',
        name: 'description',
        content: '강동대학교 학생들을 위한 소셜 네트워크 서비스'
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '강동대학교 SNS' },
      { property: 'og:url', content: 'http://n2ptune.dothome.co.kr/' },
      {
        property: 'og:description',
        content: '강동대학교 학생들을 위한 소셜 네트워크 서비스'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'canonical', href: 'http://n2ptune.dothome.co.kr/' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/variables.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/firebase.js' },
    { src: '~/plugins/vuexPersistence.js', mode: 'client' },
    { src: '~/plugins/day.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-webfontloader'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  webfontloader: {
    google: {
      families: ['Nanum+Gothic:400,700,800&display=swap']
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // loaders: [
    //   {
    //     test: /\.(png|jpe?g|gif|svg)$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 1000, // 1초
    //       name: 'img/[name].[hash:7].[ext]'
    //     }
    //   }
    // ],
    extend(config, ctx) {}
  },
  // Custom Below
  srcDir: 'client/',
  generate: {
    dir: 'dist/'
  },
  vendor: ['~/plugins/vuexPersistence.js', '~/store.index.js']
}
