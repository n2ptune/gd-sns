<template>
  <v-content style="background-color: #eee;">
    <v-container class="my-5">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card v-if="$store.state.user">
            <v-card-title>
              <div class="mx-auto headline">{{ $store.state.user.displayName }}님의 프로필</div>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-clipboard-account-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ $store.state.user.displayName }}</v-list-item-title>
                    <v-list-item-subtitle>이름</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push('/profile/my-articles')">
                  <v-list-item-icon>
                    <v-icon>mdi-post</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>내 게시글 모아보기</v-list-item-title>
                    <v-list-item-subtitle>내 게시글 모아보기</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>로그아웃</v-list-item-title>
                    <v-list-item-subtitle>로그아웃</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
	export default {
    middleware: 'auth',
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
	}
</script>