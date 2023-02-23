<template>
  <div id="main-page">
    <NFTSet/>
    <WhatIsThis/>
    <GetNFT/>
    <RemioArtSession/>
    <FollowNow />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
import GetNFT from '@/components/GetNFT.vue';
import RemioArtSession from '@/components/RemioArtSession.vue';
export default defineComponent({
name: "MainPage",
  components: { FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession }
});
</script>

<style scoped>
    #main-page {

    }
</style>