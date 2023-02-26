<template>
  <div class="trigger"></div>
  <div class="frame">
    <img class="image" id="imgsequence" src="http://399.michaelkennedy.ch/bw_frames/0000.jpg" alt="background">
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
import { TimelineMax, Linear } from 'gsap';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax);

import $ from 'jquery';

export default {
  name: "MainPage",
  components: {FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession,     MainFooter,},
  mounted(){
    let framePath = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/';
    let nFrames = 130;
    let fileType = ".jpg";
    let pageLengt = 2000;

    let images = [];
    let numberSequence = [];

    function pad(number, length) {
      let str = '' + number;
      while (str.length < length) { str = '0' + str; }
      return str;
    }

    for (let i = 10; i < (nFrames); i++) {
      images.push(framePath +pad(i, 4) + fileType);
    }

    for (let i = 0; i < (nFrames); i++) {
      numberSequence.push(i);
    }

    let obj = {curImg: 0};

    let ImageSequenceTween = new TimelineMax()
        .to(obj, 0.5,
            {
              curImg: images.length - 1,
              roundProps: "curImg",
              repeat: 0,
              immediateRender: true,
              ease: Linear.easeNone,
              onUpdate: function () {
                $("#imgsequence").attr("src", images[obj.curImg]);
                $("#framesequencenumber").text(numberSequence[obj.curImg]);

              }
            }
        )


      let ImageSequenceController = new ScrollMagic.Controller();

      let scene = new ScrollMagic.Scene({
        triggerElement: ".trigger",
        triggerHook: 0,
        offset: -100,
        duration: pageLengt,
      })
          .setTween(ImageSequenceTween)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(ImageSequenceController);
        console.log('scene', scene);
  }
};
</script>

<style scoped>
#main-page{
  position: absolute;
  width: 100%;
}

.trigger{
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