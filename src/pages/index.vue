<template>
  <v-content style="background-color: white;">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="text-center display-1">
            {{ $store.state.user === null ? 'Universial Social Network Service' : `${$store.state.user.displayName}님 안녕하세요.` }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {

}
</script>

<style>

</style>