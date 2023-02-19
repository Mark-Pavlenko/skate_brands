<template>
  <MainHeader />
  <div class="body-content">
    <router-view />
  </div>
  <MainFooter />
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { API_ENDPOINT } from "./constants/api";
import $WEB3AUTH from "./constants/web3auth";
import axiosServices from "./services/axiosServices";
import Web3AuthService from "./services/web3authServices";
import moment from "moment";
import { mapState } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import jwt_decode from "jwt-decode";
import { useI18n } from "vue-i18n";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default defineComponent({
  data() {
    return {
      w3a: Web3AuthService,
    };
  },
  async created() {
    var lang = "ja";
    moment.locale("ja");
    if (navigator.language) lang = navigator.language;
    this.$store.commit("lang/SET_LANG", lang);
    // !!: To hide default title dervied from project name
    document.title = "RE:";
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();

    async function checkExp(callback: (arg0: {}) => void) {
      const config = JSON.parse(sessionStorage.getItem("dao") as string);
      if (!config || !config?.idToken) {
        callback(false);
        return;
      }
      const jwtDecoded: any = jwt_decode(config?.idToken);
      const exp: number = jwtDecoded?.exp;
      const systemDateUnix: number = new Date().getTime() / 1000;
      if (exp < systemDateUnix) {
        console.error("session expired", exp, systemDateUnix);
        callback(false);
      } else {
        callback(true);
      }
      return;
    }

    watch(
      () => route.name,
      async () => {
        if (route?.name === "sign-in") {
          document
            .getElementById("w3a-container")
            ?.classList?.remove("w3a-display-none");
        } else {
          document
            .getElementById("w3a-container")
            ?.classList?.add("w3a-display-none");
        }
        if (
          route?.name === "/" ||
          route?.name === "email-verification" ||
          route?.name === "code-verification"
        ) {
          return;
        }
        checkExp(async (result) => {
          if (result) {
            if (route?.name === "sign-in") {
              router.push("/mypage");
            }
          } else {
            if (route?.name === "sign-in") {
              // stay
            } else {
              try {
                await (this as any).$w3a.logout();
              } catch (e) {
              } finally {
                if (route?.name != "/") {
                  router.push("/");
                }
              }
            }
          }
        });
      }
    );
    return { route };
  },
  components: {
    MainHeader,
    MainFooter,
  },
});
</script>
<style lang="scss">
body {
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", Meiryo, sans-serif;
  margin: 0px !important;
}

.background-kv {
  background-image: url("@/assets/img/kv.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a {
  color: #1da1f2;
}

button {
  cursor: pointer;
}

/* Tab UI */
ul {
  padding: 0;
}

li {
  margin: auto;
  list-style: none;
}

.tab_list {
  overflow: hidden;
  text-align: center;
}

.tab_list li {
  width: 140px;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.1s;
  color: #888;
}

.tab_list li:not(:first-child) {
  border-left: none;
}

.tab_list li.active {
  color: #000;
  font-weight: bold;
  border-bottom: 3px solid #000;
  cursor: auto;
}

/* Container */
.n-container {
  width: 70%;
  margin: auto;
  padding: 32px;
  /*border: 1px solid #000;*/
}

.n-container .bordered {
  border: 1px solid #000;
}

.n-header {
  margin: auto;
  padding: 32px;
}

.history-back-button {
  float: left;
  border: none;
  text-decoration: underline;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
}

.n-container:nth-child(n + 2) {
  margin-top: 24px;
}

.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.5);

  /*  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);*/
}

/*Button*/
.n-btn-primary {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  /*  background-color: #0091FF;*/
  background-color: #000;
  color: $white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

.n-btn-primary:disabled {
  opacity: 0.4;
}

.n-btn-weak {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #dadada;
  color: $white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

.n-btn-link {
  text-decoration: underline;
  background-color: transparent;
  border: none;
}

/*Icon*/
.icon-tooltip {
  width: 30px;
  height: 30px;
  margin-left: 8px;
  background-image: url("@/assets/img/icon-tooltip.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-official-mark {
  display: inline-block;
  background-image: url("@/assets/img/icon-official-mark.png");
  background-size: contain;
  background-repeat: no-repeat;
}

/*Text*/
.error-text {
  margin: 4px;
  color: #ff6969;
}

.error-text-small {
  margin: 4px;
  font-size: 14px;
  color: #ff6969;
}

.weak-text {
  font-size: 12px !important;
  color: #888 !important;
}

.medium-text {
  font-size: 16px !important;
  font-weight: 600;
}

.strong-text {
  font-size: 22px !important;
  font-weight: 600;
}

.text-white {
  color: $white !important;
}

.text-blue {
  color: #1da1f2 !important;
}

.text-pink {
  color: #ff1694 !important;
}

.text-black {
  color: #000 !important;
}

.text-main {
  font-size: 1.5em;
  font-weight: 700;
  color: #1da1f2;
}

.text-overflow-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* Wallet address */
.wallet-address-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wallet-address-container div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wallet-address-container p {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  font-weight: 600;
}

.chain-name-container {
  border-radius: 15px;
  padding: 2px 6px;
  color: #000;
  background-color: #000;
}

.chain-name-container p {
  font-size: 14px;
  font-weight: 600;
  white-space: pre-wrap !important;
  margin: 0;
  word-wrap: break-word;
  color: $white;
}

.icon-wallet {
  width: 24px;
  height: 24px;
  background-image: url("@/assets/img/icon-wallet.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */
}

/* Profile View Elements */
.icon-calendar {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-calendar.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
}

.icon-comment {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-comment-white.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
}

.icon-like {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-like-white.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
}

.icon-post {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-pen.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-comment-blue {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-comment-blue.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
}

.icon-like-blue {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-like-blue.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
}

.icon-post-blue {
  width: 20px;
  height: 20px;
  background-image: url("@/assets/img/icon-pen-blue.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.user-info-sign.large {
  width: 280px;
}

.user-info-sign.pink {
  border: 1px solid #ff1694;
}

.user-info-sign {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 40px;
  margin: 12px auto;
  border-radius: 20px;
  gap: 6px;
  /*background-color: #1DA1F2;*/
  border: 1px solid #1da1f2;
}

.user-info-sign p {
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
}

/*Admin Mark*/
.admin-mark {
  /*width: 100px;*/
  /*height: 20px;*/
  padding: 6px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  background-color: #14171a;
}

hr {
  margin-top: 50px;
  background-color: #e1e8ed;
  height: 1px;
  border: none;
}

/*Form*/
form {
  margin: auto;
}

form div {
  margin-bottom: 12px;
  display: flex;
  /*align-items: center;*/
  flex-wrap: wrap;
  justify-content: center;
}

form label {
  font-weight: bold;
  width: 120px;
  font-size: 22px;
  color: #777;
  text-align: right;
}

form input {
  width: 240px;
  height: 30px;
  margin-left: 8px;
  font-size: 15px;
}

form select {
  width: 240px;
  height: 30px;
  margin-left: 8px;
  font-size: 18px;
}

form textarea {
  width: 240px;
  height: 100px;
  margin-left: 8px;
  font-size: 15px;
}

/*W3A Custom*/
#w3a-modal .w3a-footer__secured > img {
  display: none !important;
}

#w3a-modal .w3a-header__logo {
  content: url("@/assets/img/logo-square-small.png") !important;
}

.w3a-display-none {
  display: none;
}

/*Infinite loader*/
.infinite-loop-loader {
  width: 100%;
  height: 40px;
  background-color: transparent;
  background-image: url("@/assets/img/loader-medium.gif");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.container_inner {
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - デスクトップ（デフォルトのグリッド）
   1024-768    - タブレット横長
   768-480     - タブレット縦長
   480-less    - スマホ
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
  .container_inner {
    width: 90%;
  }
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
}

@media all and (max-width: 480px) {
  .n-container {
    width: 100%;
    padding: 24px 0;
  }

  .container_inner {
    width: 100%;
  }

  .chain-name-container {
    padding: 0 12px;
  }

  form input {
    width: 240px;
    height: 30px;
    margin-left: 0px;
  }

  form label {
    text-align: center;
  }
}
</style>
