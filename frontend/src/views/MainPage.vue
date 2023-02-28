<template>
  <div class="main-page-layout">
    <div id="trigger" class="trigger-class"></div>
    <div class="frame">
<!--      activate image scrolling sequence or video - just comment one or another to activate it-->

      <video id="video" tabindex="0" preload="auto" class="moving-layout">
        <source src="@/assets/movie.mp4" type="video/mp4"/>
      </video>
      <!--        <img class="moving-layout" id="imgsequence" src="@/assets/3sec_sample/2sec_sample_1.png" alt="background">-->
    </div>
    <div id="components-layout">
      <NFTSet @anchor-event="scrollMeTo"/>
      <WhatIsThis/>
      <GetNFT/>
      <RemioArtSession/>
      <FollowNow/>
      <MainFooter/>
    </div>
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
    // activate image scrolling sequence or video - just comment one or another to activate it

    // this.scrollImageSequences();
    this.scrollVideoByFrames();
  },
  methods: {
    scrollImageSequences() {
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
                onUpdate() {
                  $("#imgsequence").attr("src", imagesPaths[obj.curImg]);
                }
              }
          );

      let ImageSequenceController = new ScrollMagic.Controller();

      new ScrollMagic.Scene({
        triggerElement: ".trigger-class",
        triggerHook: 0,
        offset: -100,
        duration: pageLength,
      })
          .setTween(ImageSequenceTween)
          // .addIndicators()
          .addTo(ImageSequenceController);
    },

    scrollVideoByFrames() {
      const playbackConst = 300,
          setHeight = document.getElementById("trigger"),
          vid = document.getElementById('video');

      vid.addEventListener('loadedmetadata', function () {
        setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
      });

      const scrollPlay = () => {
        vid.currentTime = window.pageYOffset / playbackConst;
        window.requestAnimationFrame(scrollPlay);
      }

      window.requestAnimationFrame(scrollPlay);
    },

    importAll(r) {
      r.keys().forEach(key => (this.proxyImages.push({
        fullPath: r(key),
        // find image number in folder sequences
        imageNumber: +key.replace(/.*\D(?=\d)|\D+$/g, "")
      })));
    },

    scrollMeTo() {
      let element = document.getElementById("remio")
      let top = element.offsetTop;
      window.scrollTo({top: top, behavior: "smooth"});
    }
  },
};
</script>

<style scoped>
.main-page-layout{

}

#components-layout {
  position: absolute;
  width: 100%;

}

#trigger {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 20em;
  text-align: center;
  z-index: 1;
  font-size: 2vh;
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100vh;
}

.moving-layout {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

</style>