<template>
  <v-content style="background-color: #eee;">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>
              새 포스트 작성하기
              <div class="ml-auto">
                <v-btn icon color="primary darken-2">
                  <v-icon>mdi-help-circle</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="mt-3">
              <v-form ref="draw_form">
                <v-textarea
                  v-model="text"
                  label="포스트 내용을 작성하세요"
                  auto-grow
                  outlined
                  :rules="[rules.textRule]"
                ></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="green darken-2"
                dark
                class="ml-auto mr-3 mb-2"
                large
                @click="submit()"
                :loading="$store.state.drawing"
              >
                <div class="body-1">작성하기</div>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
	export default {
		middleware: 'auth',
		data() {
			return {
				text: '',
				rules: {
					textRule: t => !!t || '빈 내용을 작성할 수 없습니다.'
				}
			}
		},
		methods: {
			submit() {
				this.$store.dispatch('draw', this.text)
			}
		}
	}
</script>