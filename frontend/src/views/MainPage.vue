<template>
  <div class="trigger"></div>
  <div class="frame">
    <img class="image" id="imgsequence" src="@/assets/3sec_sample/2sec_sample_1.png" alt="background">
  </div>
  <div id="main-page">
      <NFTSet/>
      <WhatIsThis/>
      <GetNFT/>
      <RemioArtSession/>
      <FollowNow/>
      <MainFooter/>
    </div>
</template>

<script>
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
import GetNFT from '@/components/GetNFT.vue';
import RemioArtSession from '@/components/RemioArtSession.vue';
import MainFooter from "@/components/Footer.vue";
import {Linear, TimelineMax} from 'gsap';
import {ScrollMagicPluginGsap} from "scrollmagic-plugin-gsap";
import $ from 'jquery';

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

export default {
  name: "MainPage",
  components: {FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession, MainFooter,},
  data() {
    return {
      proxyImages: [],
    }
  },
  mounted() {
    this.importAll(require.context('../assets/3sec_sample/', true, /\.png$/));
    const pageLength = 4000;
    let imagesPaths = [];

    this.proxyImages.sort((a, b) => a.imageNumber - b.imageNumber).map(el => {
      imagesPaths.push(el.fullPath);
    })

    let obj = {curImg: 0};

    let ImageSequenceTween = new TimelineMax()
        .to(obj, 0.5,
            {
              curImg: imagesPaths.length - 1,
              roundProps: "curImg",
              repeat: 0,
              immediateRender: true,
              ease: Linear.easeNone,
              onUpdate: function () {
                $("#imgsequence").attr("src", imagesPaths[obj.curImg]);
              }
            }
        );

    let ImageSequenceController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      triggerHook: 0,
      offset: -100,
      duration: pageLength,
    })
        .setTween(ImageSequenceTween)
        // .addIndicators()
        .addTo(ImageSequenceController);
  },
  methods: {
    importAll(r) {
      r.keys().forEach(key => (this.proxyImages.push({
        fullPath: r(key),
        imageNumber: +key.replace(/.*\D(?=\d)|\D+$/g, "")
      })));
    },
  },
};
</script>

<style scoped>
#main-page {
  position: absolute;
  width: 100%;
}

.trigger {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 20em;
  text-align: center;
  z-index: 1;
  font-size: 2vh;
}

.frame {
  position: fixed;
  width: 100%;
  height: 100vh;
  opacity: 1;
}

.image {
  max-width: 100%;
  height: 100%;
}

@media all and (max-width: 1045px) {
  .frame {
    height: 100vh;
  }
}

</style>