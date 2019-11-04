<template>
  <v-list subheader :color="color" width="150px">
    <v-subheader>{{ subheading }} ({{ friends.length }}명)</v-subheader>

    <v-list-item v-for="(friend, index) in friends" :key="index">
      <v-list-item-avatar size="20" :style="{ marginRight: '7px' }">
        <v-img :src="friend.avatarSrc"></v-img>
      </v-list-item-avatar>
      <v-list-item-title :style="{ fontSize: '14px' }">{{ friend.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    subheading: {
      type: String,
      default: 'Not subheading'
    },
    color: {
      type: String,
      default: 'transparent'
    },
    friends: {
      type: Array,
      required: true
    }
  },
  mounted() {
    /**
     * Test code about friends list
     */
    const rndCount = Math.floor(Math.random() * (100 - 10 + 1)) + 10
    const rndStr = '이황순전현구윤지재중김찬열훈경왕준제호영'
    for(let i = 0; i < rndCount; i++) {
      let str = ''
      for(let j = 0; j < 3; j++) {
        str += rndStr[Math.floor(Math.random() * (rndStr.length - 1))]
      }
      const obj = {
        avatarSrc: `https://picsum.photos/20/20?random=${i}`,
        name: str
      }
      this.friends.push(obj)
    }
  },
  beforeDestroy() {
    this.friends = null
  }
}
</script>
