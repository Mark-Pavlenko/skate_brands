<template>
<!--  <div >-->
    <div id="huf-nft-set" :style="{ backgroundImage: 'url(' + getBackgroundImage + ')' }">
      <img id="event-info-img" src="@/assets/images/event-info-big.png" alt="event-info-big"/>
      <div id="img-layout">
        <img src="@/assets/images/huf-nft-set.png" alt="huf-nft-set"/>
      </div>
      <button id="join-now-btn">JOIN NOW</button>
    </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "NFTSet",
  data() {
    return {
      scrollTop: 1,
      selectedDog: "",
      backUrl: ""
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop = Math.round(window.scrollY / 3);
      console.log('this.scrollTop', this.scrollTop);
      this.backUrl = `@/assets/3sec_sample/2sec_sample_${this.scrollTop}.png`;
      console.log('this./backUrrl', this.backUrl);
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
#huf-nft-set {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 !important;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;

}

#event-info-img {
  position: absolute;
  top: 0;
  right: 0;
  width: 162px;
  height: 162px;
  margin-top: 113px;
  margin-right: 93px;
}

#img-layout img {
  max-width: 100%;
}

#join-now-btn {
  position: absolute;
  bottom: 0;
  margin-bottom: 75px;
  background-color: transparent;
  width: 241px;
  height: 48px;
  color: #94C93D;
  border: 2px solid #94C93D;
  font-family: 'Archivo Black', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}

@media (max-width: 1279px) {
  #huf-nft-set {
    height: 680px;
  }

  #event-info-img {
    width: 114px;
    height: 114px;
    margin-top: 95px;
    margin-right: 18px;
  }

  #img-layout {
    margin: 0 19px 0 19px;
  }

  #join-now-btn {
    width: 181px;
    height: 36px;
    margin-bottom: 55px;
  }
}

@media (min-width: 745px) {
  #img-layout {
    width: 743px;
    height: 231px;
  }
}

@media (min-width: 1280px) {
  #huf-nft-set {
    height: 800px;
  }
}

</style>