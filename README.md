# 강동대학교 소셜 네트워크 서비스 :kissing_smiling_eyes:

## 데모

강동대학교 소셜 네트워크 서비스는 다음의 링크를 통해 데모 사이트를 확인하실 수 있습니다.

[https://sns.n2ptune.xyz/](https://sns.n2ptune.xyz/)

## 설명

Vue로 작성된 Single Page Application(SPA) 기반 웹 애플리케이션입니다.

## 참조

See update log [UPDATELOG](/UPDATELOG.md)

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
