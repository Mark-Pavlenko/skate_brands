<template>
  <div class="auth-container">
    <span class="main-title">{{ $t("signup") }}</span>

    <div class="self-card">
      <span class="card-title underline">{{ $t("signup") }}</span>
      <v-button
        v-if="isNotLoggedIn"
        @click="handleLogin"
        :text="$t('signin')"
      />
      <v-button v-else @click="handleLogin" :text="$t('logout')" />
    </div>
    <OverlaySpinner v-show="showSpinner" :message="spinnerMessage" />
  </div>
</template>

<script lang="ts">
import VButton from "@/components/Button.vue";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import $WEB3AUTH from "@/constants/web3auth";
import jwt_decode from "jwt-decode";
import OverlaySpinner from "@/views/OverlaySpinner.vue";
import axiosService from "@/services/axiosServices";
import { API_ENDPOINT } from "@/constants/api";

export default defineComponent({
  name: "SignUpView",
  data() {
    return {
      chainId: "",
      isNotLoggedIn: !this.userData,
      tokenAddress: "",
      user_id: null as unknown as string,
      chainName: "" as string,
      showSpinner: false,
      spinnerMessage: this.$t("checking_nft"),
    };
  },
  components: {
    VButton,
    OverlaySpinner,
  },
  computed: {
    ...mapState("user", {
      userData: "data",
    }),
    ...mapState("lang", {
      lang: "lang",
    }),
  },
  mounted() {
    document.body.className = "sign-in";
    console.log(this.userData);
  },
  unmounted() {
    document.body.className = "";
  },
  methods: {
    ...mapMutations({
      setUserData: "user/SET_USER_DATA",
    }),
    ...mapMutations({
      setUserId: "user/SET_USER_ID",
    }),
    checkNFT(tokenAddress: string, walletAddress: string) {
      this.showSpinner = true;
      let _this = this;
      this.spinnerMessage = (this as any).$t("sending_nft");
      axiosService
        .get(`${API_ENDPOINT}/v1/wallet/${walletAddress}/nft`, {})
        .then((res: any) => {
          if (res.data.result.length > 0) {
            _this.showSpinner = false;
            _this.$swal({
              title: (this as any).$t("warning_nft_already_have"),
              position: "center",
              icon: "success",
              timer: 2500,
              showCancelButton: false,
            });
            _this.$router.push("/mypage");
          } else {
            (this as any).$swal({
              title: (this as any).$t("no_nft"),
              position: "center",
              icon: "error",
              timer: 2500,
            });
            this.logout();
            return;
          }
        })
        .catch(async (e: any) => {
          _this.showSpinner = false;
          if (e.response.status === 403) {
            (this as any).$swal({
              title: (this as any).$t("sorry_something_went_wrong"),
              text: (this as any).$t("please_try_again"),
              position: "center",
              icon: "error",
              timer: 2500,
            });
          } else {
            (this as any).$swal({
              title: (this as any).$t("sorry_something_went_wrong"),
              text: (this as any).$t("please_try_again"),
              position: "center",
              icon: "error",
              timer: 2500,
            });
          }
          this.logout();
          return;
        });
    },
    async handelUnexpectedError() {
      const _this = this;
      await (this as any).$swal({
        title: (this as any).$t("sorry_something_went_wrong"),
        text: (this as any).$t("please_try_again"),
        position: "center",
        icon: "error",
        timer: 2500,
      });
      await _this.$router.push({ name: "sign-in" });
    },
    async nftRecive() {
      await axiosService.refreshCsrfToken();
      this.showSpinner = true;
      await (this as any).$w3a.login(async (info: any) => {
        if (info.status === $WEB3AUTH.STATUS.LOGIN.SUCCESS) {
          console.log("WALLET LOGIN SUCCESS", (this as any).$w3a?.userData);
          if (!(this as any).$w3a?.userData?.address) {
            console.error(
              "Unexpected state, user have no wallet address",
              (this as any).$w3a?.userData
            );
            this.handelUnexpectedError();
            return;
          }
          await axiosService
            .get(
              `${API_ENDPOINT}/v1/wallet/${
                (this as any).$w3a.userData.address
              }/user_id`,
              {}
            )
            .then(async (res: any) => {
              if (!res.data.user_id) {
                /** No User ID, CREATE USER */
                const _this = this;
                await axiosService.refreshCsrfToken();

                let verificationCode = (this as any).$w3a.userData.data
                  .verification_code;
                if (!verificationCode) {
                  verificationCode =
                    sessionStorage.getItem("verification_code");
                }

                await axiosService
                  .post(`${API_ENDPOINT}/v1/user`, {
                    wallet_address: (this as any).$w3a.userData.address,
                    verification_code: verificationCode,
                  })
                  .then(async (res: any) => {
                    this.showSpinner = false;
                    if (res.status === 200 || res.status === 201) {
                      this.user_id = res.data.id_info.value;
                      this.setUserId({ user_id: this.user_id });

                      await axiosService
                        .post(`${API_ENDPOINT}/v1/login`, {})
                        .then(() => {
                          this.checkNFT(
                            this.tokenAddress,
                            (this as any).$w3a.userData.address
                          );
                          this.showSpinner = false;
                        })
                        .catch((e: any) => {
                          sessionStorage.dao = null;
                          this.handelUnexpectedError();
                        });
                    } else {
                      this.handelUnexpectedError();
                    }
                  })
                  .catch(async (e: any) => {
                    console.error("Failed to create a user", e);
                    this.showSpinner = false;
                    sessionStorage.dao = null;
                    if (e.response.status === 403) {
                      // 403 returns when domain check fails
                      (this as any)
                        .$swal({
                          title: (this as any).$t("error_invalid_domain"),
                          text: (this as any).$t(
                            "error_invalid_domain_description"
                          ),
                          position: "center",
                          icon: "error",
                          timer: 2500,
                        })
                        .then(async function (result: any) {
                          try {
                            await (_this as any).$w3a.logout();
                          } catch (e) {
                            console.error("logout fail", e);
                          } finally {
                            sessionStorage.removeItem("dao");
                            _this.$router.push({ name: "sign-in" });
                          }
                        });
                    } else if (e.response.status === 404) {
                      await (this as any).$swal({
                        title: (this as any).$t("failed_to_sign"),
                        text: (this as any).$t("start_from"),
                        position: "center",
                        icon: "error",
                        timer: 2500,
                      });
                      await this.$router.push({ name: "code-verification" });
                    } else if (e.response.status === 409) {
                      await (this as any).$swal({
                        title: (this as any).$t("different_account"),
                        position: "center",
                        icon: "error",
                        timer: 2500,
                      });
                    } else {
                      sessionStorage.dao = null;
                      this.handelUnexpectedError();
                      console.log("ERROR");
                    }
                  });
              } else {
                /** User exists, logging in */
                this.user_id = res.data.user_id;
                this.setUserId({ user_id: this.user_id });

                await axiosService
                  .post(`${API_ENDPOINT}/v1/login`, {})
                  .then(() => {
                    this.checkNFT(
                      this.tokenAddress,
                      (this as any).$w3a.userData.address
                    );
                    this.showSpinner = false;
                  })
                  .catch((e) => {
                    sessionStorage.dao = null;
                    this.handelUnexpectedError();
                  });
              }
            })
            .catch(async (e: any) => {
              this.showSpinner = false;
              this.handelUnexpectedError();
            });
        } else {
          this.showSpinner = false;
          this.handelUnexpectedError();
        }
      });
    },
    async logout() {
      await (this as any).$w3a.logout();
      this.isNotLoggedIn = true;
    },
    async handleLogin() {
      if ((this as any).$w3a.getUserInfo(() => {})) {
        try {
          console.log("logging out..", this.userData);
          await (
            this as any
          ).$w3a.web3Auth.walletAdapters.metamask.disconnect();
        } catch (e) {
          console.log("failed to logout", e);
        }
        try {
          await (this as any).$w3a.web3Auth.logout();
        } catch (e) {
          console.log("failed to logout", e);
        }
      } else {
        console.log("user data is null", this.userData);
      }

      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      if (isSafari) {
        try {
          await (this as any).$w3a.login(() => {});
        } catch (e) {
          console.error("failure", e);
        } finally {
          const app_scoped_privkey = (await (
            this as any
          ).$w3a.web3Auth.provider?.request({
            method: "eth_private_key",
          })) as any;
          // console.log("app_scoped_privkey", app_scoped_privkey);
          if (!app_scoped_privkey) {
            // retry
            console.log("retry", app_scoped_privkey);
            let _this = this;
            (this as any)
              .$swal({
                title: (this as any).$t("sorry_something_went_wrong"),
                text: (this as any).$t("please_try_again"),
                position: "center",
                icon: "error",
                timer: 2500,
              })
              .then(async function (result: any) {
                await _this.logout();
                _this.handleLogin();
              });
            return;
          }
          const app_pub_key = getPublicCompressed(
            Buffer.from(app_scoped_privkey?.padStart(64, "0"), "hex")
          ).toString("hex");
          // console.log("public_key", app_pub_key);
          const user = await (this as any).$w3a.web3Auth.getUserInfo();
          // set axios default header
          const userIdToken = {
            idToken: user.idToken,
            app_pub_key: app_pub_key,
          };
          sessionStorage.setItem("dao", JSON.stringify(userIdToken));

          this.nftRecive();
        }
      } else {
        (this as any).$w3a.login(async (info: any) => {
          if (info.status === $WEB3AUTH.STATUS.LOGIN.SUCCESS) {
            sessionStorage.removeItem("iWeb3Auth-cachedAdapter");
            let app_scoped_privkey;
            let user: any = {};
            let app_pub_key;
            try {
              const userInfo = (await (
                this as any
              ).$w3a.web3Auth.authenticateUser()) as any;
              let idToken = userInfo.idToken;
              user.idToken = idToken;
              const jwtDecoded: any = jwt_decode(idToken);
              app_pub_key = jwtDecoded.wallets[0].address;
              if (!app_pub_key) {
                app_scoped_privkey = (await (
                  this as any
                ).$w3a.web3Auth.provider?.request({
                  method: "eth_private_key",
                })) as any;
                user = await (this as any).$w3a.web3Auth.getUserInfo();
                console.log(user);
                app_pub_key = getPublicCompressed(
                  Buffer.from(app_scoped_privkey?.padStart(64, "0"), "hex")
                ).toString("hex");
              }

              // set axios default header
              const userIdToken = {
                idToken: user.idToken,
                app_pub_key: app_pub_key,
              };
              sessionStorage.setItem("dao", JSON.stringify(userIdToken));
            } catch (e) {
              await (this as any).$w3a.web3Auth.connect();
              app_scoped_privkey = await (
                this as any
              ).$w3a.web3Auth.authenticateUser();

              const app_pub_key = await getPublicCompressed(
                Buffer.from(
                  app_scoped_privkey.idToken?.padStart(64, "0"),
                  "hex"
                )
              ).toString("hex");

              // set axios default header
              const userIdToken = {
                idToken: user.idToken,
                app_pub_key: app_pub_key,
              };
              sessionStorage.setItem("dao", JSON.stringify(userIdToken));
            }

            this.nftRecive();
          } else {
            const _this = this;
            (this as any)
              .$swal({
                title: (this as any).$t("sorry_something_went_wrong"),
                text: (this as any).$t("please_try_again"),
                position: "center",
                icon: "error",
                timer: 2500,
              })
              .then(function (result: any) {
                _this.logout();
              });
          }
        });
      }
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.underline {
  margin-bottom: 47px;
}
.border-vertical {
  position: absolute;
  width: 0;
  height: 40px;
  left: 50vw;
  top: 195px;
  z-index: 1;
  border: 1px solid $black;
}
</style>
