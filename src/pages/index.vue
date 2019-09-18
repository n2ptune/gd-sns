<template>
  <v-content
    :style="`background-image: url(${require('~/assets/test-image.jpg')})`"
    class="background"
  >
    <v-container fluid>
      <span class="mx-auto text-center d-block t-container">
        <div class="mb-4">
          <v-icon class="mb-2 g-icon" large dark>mdi-penguin</v-icon>
          <span class="text-center white--text title font-weight-d-light text--shadow">강동대학교 소셜 네트워크</span>
        </div>
        <div
          class="title white--text font-weight-bold text--shadow"
        >강동대학교 학생들을 위한 Social Network Service</div>
        <v-btn
          class="mt-5 font-weight-bold"
          width="24rem"
          color="amber lighten-1"
          to="/login"
        >구글로 로그인하기</v-btn>
      </span>
    </v-container>
  </v-content>
</template>

<script>
	export default {
		layout: 'main'
		// computed: {
		//   responsiveName () {
		//     return this.$vuetify.breakpoint.name === 'xs'
		//       ? 'SNS'
		//       : this.$vuetify.breakpoint.name === 'sm'
		//       ? 'SNS'
		//       : 'Social Network Service'
		//   }
		// }
	}
</script>

<style>
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
	.t-container {
		margin-bottom: 7rem;
	}
	.font-weight-d-light {
		font-weight: 400 !important;
	}
	.g-icon {
		border: 1px solid white;
		border-radius: 20px;
		margin-right: 1rem;
	}
	.text--shadow {
		text-shadow: 0 0 1rem rgba(0, 0, 0, 0.95);
	}
	.g-btn {
		margin-top: 4rem;
	}
</style>