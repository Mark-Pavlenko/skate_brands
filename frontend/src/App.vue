<template>
  <div class="app">
      <router-view/>
    </div>
<!--  <MainFooter/>-->
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