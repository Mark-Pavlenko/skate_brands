<template>
  <div class="auth-container">
    <div class="d-flex flex-column">
      <span class="head-title">{{ $t("mypage") }}</span>
      <span class="wallet mt-4" v-if="user.wallets">{{
        user.wallets[0].wallet_address
      }}</span>

      <b-carousel
        indicators
        :interval="4000"
        controls
        v-if="toChunks"
        class="mt-5 carousel-block"
        :class="{ 'one-page-only': NFTS.length < 2 }"
      >
        <b-carousel-slide
          active
          background="#ffffff"
          v-for="(items, idx) in NFTS"
          :key="idx"
        >
          <template v-slot:img>
            <div class="d-flex flex-wrap justify-content-center nft-container">
              <NFT
                v-for="item in items"
                :token="item"
                :key="item.token_id"
              ></NFT>
            </div>
          </template>
        </b-carousel-slide>
        <Loading class="p-5" v-if="NFTS.length === 0"></Loading>
      </b-carousel>

      <div class="info-block">
        <div class="title">RE:VISION NFTについて</div>
        <div class="sub-title">ABOUT RE:VISION NFT</div>
        <div class="description">
          {{ $t("section_above") }}
        </div>
        <div class="foot-img">{{ $t("join_to_com") }}</div>
      </div>
      <div class="contact-block">
        <div class="title">
          {{ $t("section_bellow") }}
        </div>
        <div class="d-flex socials justify-content-center">
          <div class="d-flex justify-content-center align-content-center m-2">
            <img src="@/assets/img/twitter.svg" class="mr-4" />
            <a href="">Twitterコミュニティはこちら</a>
          </div>
          <div class="d-flex justify-content-center align-content-center m-2">
            <img src="@/assets/img/discord.svg" class="mr-4" />
            <a href="">Discordコミュニティはこちら</a>
          </div>
        </div>
        <v-button class="m-auto" :text="$t('logout')" @click="logout" />
      </div>
    </div>
  </div>
  <OverlaySpinner
    v-show="showSpinner"
    :message="spinnerMessage"
  ></OverlaySpinner>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import $WEB3AUTH from "@/constants/web3auth";
import NFT from "@/components/NFT.vue";
import OverlaySpinner from "@/views/OverlaySpinner.vue";
import { mapActions, mapGetters } from "vuex";
import Web3AuthService from "../services/web3authServices";
import VButton from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "MyPageView",
  components: { NFT, OverlaySpinner, VButton, Loading },
  data() {
    return {
      showSpinner: true,
      spinnerMessage: "Loading data",
      email: "---",
      page: 1,
      rpc: Web3AuthService,
      NFTS: [],
    };
  },
  async mounted() {
    if (
      !(this as any).rpc.userData ||
      ((this as any).rpc.userData && (this as any).rpc.userData.chainId !== "81")
    ) {
      this.logout();
      return;
    }
    (this as any).$w3a.login(async (callback: any) => {
      console.log("callback", callback);
      if (callback?.status === $WEB3AUTH.STATUS.LOGIN.SUCCESS) {
        try {
          const user = await (this as any).$w3a.web3Auth.getUserInfo();
          (this as any).email = user.email;
          const wallet = (this as any).user.wallets
            ? (this as any).user.wallets[0].wallet_address
            : (this as any).rpc.userData.address;
          if (wallet) {
            await (this as any).fetchUserId({ wallet_address: wallet });
            await (this as any).fetchUser();
            await (this as any).fetchNFT(wallet);
            await this.toChunks();
          }
        } catch (e) {
          console.error("w3a get user info failed", e);
          (this as any).handelUnexpectedError();
        }
      } else {
        console.error("w3a login failed");
        (this as any).handelUnexpectedError();
      }
    });
  },
  computed: {
    ...mapGetters({
      user: "user/data",
      userNFT: "nft/data",
    }),
  },
  methods: {
    ...mapActions({
      fetchUserId: "user/FETCH_USER_ID",
      fetchUser: "user/FETCH_USER",
      fetchNFT: "nft/FETCH_USER_NFTS",
    }),
    async logout() {
      (this as any).spinnerMessage = "logging out...";
      (this as any).showSpinner = true;
      try {
        await (this as any).$w3a.logout();
      } catch (e) {
        console.error(e);
      } finally {
        sessionStorage.removeItem("dao");
        (this as any).showSpinner = false;
        this.$router.push("/sign-in");
      }
    },
    handelUnexpectedError() {
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
          _this.$router.push({ name: "sign-in" });
        });
    },
    toChunks() {
      const size = 4;
      if ((this as any).userNFT.result) {
        for (let i = 0; i < (this as any).userNFT.result.length; i += size) {
          (this as any).NFTS.push(
            (this as any).userNFT.result.slice(i, i + size)
          );
        }
        this.showSpinner = false;
      }
    },
  },
});
</script>
<style lang="scss">
.nft-container {
  padding-bottom: 40px;
}

.info-block {
  background-color: $white;
  width: 100%;
  text-align: center;
  padding: 50px;
  color: $black;
  flex-direction: column;
  @media all and (max-width: 750px) {
    padding: 30px;
  }
  .title {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 210%;
    /* or 29px */

    text-align: center;

    color: #000000;
    @media all and (max-width: 750px) {
      text-align: left;
      font-size: 13px;
    }
  }
  .sub-title {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 107.5%;
    /* identical to box height, or 52px */

    letter-spacing: 0.03em;

    color: #000000;
    @media all and (max-width: 750px) {
      text-align: left;
      font-size: 40px;
    }
  }
  .description {
    margin: 0 auto;
    margin-top: 17px;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 180%;
    /* or 23px */
    max-width: 450px;
    text-align: center;

    color: #000000;
    @media all and (max-width: 750px) {
      text-align: left;
    }
  }
  .foot-img {
    width: fit-content;
    position: relative;
    background: $black;
    font-family: "DotGothic16";
    font-style: normal;
    font-weight: 400;
    font-size: 38px;
    line-height: 55px;
    text-align: center;
    color: $white;
    padding: 0 10px;
    top: 70px;
    margin: 0 auto;
    @media all and (max-width: 750px) {
      font-size: 38px;
      line-height: 55px;
    }
  }
}

.contact-block {
  text-align: center;
  width: 100%;
  padding: 50px;
  background: #e7e7e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media all and (max-width: 750px) {
    padding-top: 100px;
  }
  .title {
    max-width: 450px;
    margin: 0 auto;
    text-align: center;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    color: $black;
    font-size: 14px;
    @media all and (max-width: 750px) {
      font-size: 13px;
    }
  }
  .socials {
    margin-top: 46px;
    margin-bottom: 20px;
    align-content: center;
    align-items: center;
    @media all and (max-width: 750px) {
      flex-direction: column;
    }
    a {
      color: $black;
      margin-left: 5px;
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 210.5%;
      letter-spacing: 0.1em;
      text-decoration-line: underline;
    }
  }
}

.container {
  margin: 200px auto 100px;
}
</style>
