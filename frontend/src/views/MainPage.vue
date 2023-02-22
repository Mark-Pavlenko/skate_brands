<template>
  <div id="main-page">
    <NFTSet/>
    <WhatIsThis/>
    <GetNFT/>
    <FollowNow />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
import GetNFT from '@/components/GetNFT.vue';
export default defineComponent({
name: "MainPage",
  components: { FollowNow, NFTSet, WhatIsThis, GetNFT }
});
</script>

<style scoped>
    #main-page {
      margin: 0 !important;
      background-image: url("@/assets/images/background-page.png") !important ;
      background-attachment: fixed;
      /*width: 100%;*/
      /*height: calc(100vw / (1280 / 1000));*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
</style>