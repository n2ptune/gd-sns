<template>
  <v-content>
    <v-container>
      <!-- Article Template -->
      <v-row v-for="i in 15" :key="i" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="article--container">
            <v-card-title>
              <v-avatar size="28" class="mr-2">
                <img :src="$store.state.user.photoURL" :alt="$store.state.user.displayName" />
              </v-avatar>
              <div class="author--text">
                {{ $store.state.user.displayName }}님의 게시글
                <!-- 글 쓴 시간 -->
                <div class="caption" style="line-height: 0.5rem !important;">2019.09.19</div>
              </div>
              <!-- @TODO: 프로필 바로가기 설정 -->
              <v-btn icon right class="ml-auto">
                <v-icon color="green accent-4">mdi-tooltip-account</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text
              class="black--text article--area mt-5"
            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</v-card-text>
            <v-card-actions>
              <div class="ml-auto">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-charity</v-icon>
                    </v-btn>
                  </template>
                  <span>공감하기</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-message-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>댓글</span>
                </v-tooltip>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
	export default {
		// @SEE 'middleware/auth.js'
		middleware: 'auth'
	}
</script>

<style lang="scss">
	.author--text {
		font-size: 1rem !important;
	}
	.article--area {
		font-size: 1.25rem !important;
	}
</style>