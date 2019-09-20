# 강동대학교 소셜 네트워크 서비스 :kissing_smiling_eyes:

## 데모

강동대학교 소셜 네트워크 서비스는 다음의 링크를 통해 데모 사이트를 확인하실 수 있습니다.
[강동대학교 SNS](http://n2ptune.dothome.co.kr/)

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