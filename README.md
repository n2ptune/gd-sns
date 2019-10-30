# 강동대학교 소셜 네트워크 서비스 :kissing_smiling_eyes:

## 데모

강동대학교 소셜 네트워크 서비스는 다음의 링크를 통해 데모 사이트를 확인하실 수 있습니다.
[강동대학교 SNS](https://gd-sns.herokuapp.com)

## 개발

이 프로젝트는 다음과 같은 기술 스택을 사용합니다.

> Vue(2.6.10), Vuex, Nuxt(2.9.x), Vuetify(2.0.x), Node.js(11.6.0), firebase, firebase-auth, firestore

이 프로젝트를 Fork하셔서 개발을 하고 싶으시다면 firebase의 모든 설정을 바꾸어주셔야 합니다. 자세한 내용은 __src/plugins/firebase.js__ 를 참고하세요.

firebase와 통신하고 사용자 인증에 관해선 모두 Vuex를 사용합니다. 자세한 내용은 __src/store/index.js__ 를 참고하세요.

Fork하신 뒤에 아래 명령어를 입력하면 프로젝트를 실행할 수 있습니다.

```bash
git clone https://github.com/n2ptune/gd-sns

cd gd-sns
# 의존성 설치
npm install

# 개발 서버 시작(핫 리로딩 포함)
npm run dev

# 빌드
npm run build

# 프로덕션 모드로 서버 시작
npm run start
```

## 참조

더 자세한 내용은 [Nuxt.js docs](https://nuxtjs.org/)에서 확인하실 수 있습니다.

## Fix

* firebase.firestore.Timestamp.toDate().toLocaleDateString

```javascript
/* path: src/pages/articles/index.vue */
const options = {
  dateStyle: 'full',
  // only minuates, seconds
  timeStyle: 'short',
  // PM 11:00 -> 23:00
  hour12: false
}
// It can have more options
// @SEE MDN https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// @SEE src/pages/articles/index.vue line at 64
return new Date(
  new this.$firebase.firestore.Timestamp(
    stamp.seconds,
    stamp.nanoseconds
  ).toDate()
).toLocaleDateString('ko-KR', options)
```

* use $nuxt variable in store

```javascript
/* path: src/store/index.js 
 * When you want use options(push, redirect) of router in vuex actions
 * try below code */
commit('setUser', result.user)
$nuxt.$router.push('/articles')
// This code completes the commit and moves the router.
// i don't know that why i can use $nuxt variable
// it was not written anywhere of official site
```

* initialize state of vuex when page reload or refresh

use module [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

```javascript
// path: src/plugins/vuexPersistence.js
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => createPersistedState({})(store)
```