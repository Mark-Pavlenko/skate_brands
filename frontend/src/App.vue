<template>
  <div class="app">
      <router-view/>
    </div>
  <MainFooter/>
</template>
<script lang="ts">
import {defineComponent} from "@vue/runtime-core";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/Footer.vue";

export default defineComponent({
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      scrollTop: 0,
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop = window.scrollY;
      console.log('this.scrollTop', Math.floor(this.scrollTop));
      //  /6
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
});
</script>

<style>
  .app {
    margin: 0 !important;
    background-image: url("@/assets/3sec_sample/2sec_sample_1.png") !important ;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>