<template>
  <div id="main-page">
    <NFTSet/>
    <WhatIsThis/>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
    <p>Main page</p>
  <FollowNow />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
export default defineComponent({
name: "MainPage",
  components: { FollowNow, NFTSet, WhatIsThis }
});
</script>

<style scoped>
    #main-page {
      /*background-color: #000;*/
    }
</style>