<template>
  <div class="main-layout">
    <div class="head-mag">
      <img src="@/assets/img/desc-back.png" class="desk w-100" alt="" />
      <img src="@/assets/img/back-mob.png" class="mob w-100" alt="" />
      <div class="web3-info">
        <div>{{ $t("web3_and_the") }}</div>
        <div>{{ $t("future_of") }}</div>
        <div>{{ $t("social_good") }}</div>
      </div>
    </div>
    <div class="sub-container">
      <div class="description">
        {{ $t("description_top_view") }}
      </div>
      <div class="d-flex justify-content-around mt-5 routes">
        <div class="grad-btn" @click="goCodeCheckView">
          {{ $t("receive-nft") }}
        </div>
        <div class="link" @click="goToSignIn">
          {{ $t("already_sign_up") }}
          <span class="underline">{{ $t("login") }}</span>
        </div>
      </div>

      <div class="d-flex justify-content-center web3">
        <img src="@/assets/img/web3.png" alt="" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.head-mag {
  .mob {
    display: none;
  }

  .desk {
    display: block;
  }

  @media all and (max-width: 750px) {
    .desk {
      display: none;
    }
    .mob {
      display: block;
    }
  }
}

.main-layout {
  max-width: 100vw !important;
  margin: 0 !important;
  padding-top: 126px;
  padding-bottom: 100px;
  background-image: url("@/assets/img/main-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  @media all and (max-width: 750px) {
    padding-top: 91px;
  }
  .web3-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 33vw;
    left: 10vw;

    div {
      width: fit-content;
      padding: 0 10px;
      margin-top: 20px;
      text-align: left;
      background: $black;
      font-family: "DotGothic16";
      font-style: normal;
      font-weight: 400;
      font-size: 53px;
      line-height: 77px;

      color: $white;
      @media all and (max-width: 850px) {
        font-size: 38px;
        margin-top: 5px;
        line-height: 55px;
      }
    }

    @media all and (max-width: 850px) {
      top: 28vh;
    }

    @media all and (max-width: 750px) {
      font-size: 20px;
      top: 50vh !important;
      left: 25px;
    }
  }
  .sub-container {
    margin-top: -70px;
    display: flex;
    flex-direction: column;
    margin-left: 10vw;
    margin-right: 10vw;

    .description {
      text-align: left;
      width: 50vw;
      @media all and (max-width: 750px) {
        font-size: 20px;
        width: 100%;
      }
    }
    .routes {
      align-items: center;
      @media all and (max-width: 750px) {
        flex-direction: column;
      }
    }
    .grad-btn {
      cursor: pointer;
      width: 500px;
      padding: 10px 60px;
      border-radius: 62px;
      color: white;
      font-size: 32px;
      background: rgb(72, 105, 255);
      background: linear-gradient(
        90deg,
        rgba(72, 105, 255, 1) 0%,
        rgba(148, 97, 222, 1) 30%,
        rgba(235, 89, 2, 1) 100%
      );

      @media all and (max-width: 750px) {
        width: auto;
        font-size: 24px;
        padding: 10px 20px;
      }
    }

    .link {
      cursor: pointer;
      color: $black;
      font-size: 25px;
      @media all and (max-width: 750px) {
        margin-top: 20px;
        font-size: 18px;
      }
    }

    .underline {
      text-decoration: underline;
    }

    .web3 {
      margin-top: 60px;
      @media all and (max-width: 750px) {
        img {
          width: 80vw;
        }
      }
    }
  }
}

.top {
  &-title {
    font-weight: bold !important;
    color: #000;
  }

  &-img {
    width: 40%;
  }

  &-btn {
    cursor: pointer;
    width: 308px;
    padding: 15px 10px;
    background-color: #000;
    font-weight: bold;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 8px !important;
  }

  &-btn:disabled {
    opacity: 0.5;
  }
}

@media all and (max-width: 480px) {
  .top {
    &-img {
      width: 80%;
    }

    &-btn {
      width: 100%;
    }
  }
}

.description {
  font-size: 22px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopView",
  data() {
    return {};
  },
  methods: {
    goCodeCheckView() {
      this.$router.push("code-verification");
    },
    goToSignIn() {
      this.$router.push("sign-in");
    },
  },
});
</script>
