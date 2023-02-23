<template>
  <div class="app">
      <router-view/>
    </div>
  <MainFooter/>
</template>
<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/Footer.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>

<style>
  .app {
    /*margin: 0 !important;*/
    /*background-image: url("@/assets/3sec_sample/2sec_sample_1.png");*/
    /*background-attachment: fixed;*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
  }
</style>