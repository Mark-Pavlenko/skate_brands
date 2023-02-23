<template>
  <div id="main-page" :style="{ backgroundImage: 'url(' + getBackgroundImage + ')' }">
    <NFTSet/>
    <WhatIsThis/>
    <GetNFT/>
    <RemioArtSession/>
    <FollowNow/>
  </div>
</template>

<script>
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
import GetNFT from '@/components/GetNFT.vue';
import RemioArtSession from '@/components/RemioArtSession.vue';

export default {
  name: "MainPage",
  components: {FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession},
  data() {
    return {
      scrollTop: 1,
      selectedDog: "",
    };
  },
  methods: {
    handleScroll() {
      if (window.scrollY <= 596) {
        this.scrollTop = Math.round(window.scrollY / 3);
      }
    },
  },
  computed: {
    getBackgroundImage() {
      return require(`@/assets/3sec_sample/2sec_sample_${this.scrollTop}.png`);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
#main-page {
  margin: 0 !important;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>