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
      /*background-color: #000;*/
    }
</style>