<template>
  <div class="trigger"></div>
  <div class="frame">
    <img  class="image" id="imgsequence" src="http://399.michaelkennedy.ch/bw_frames/0000.jpg" />
  </div>
  <div class="pageExtender"></div>
<!--  <div id="main-page" :style="{ backgroundImage: 'url(' + getBackgroundImage + ')' }">-->
<!--    <NFTSet/>-->
<!--    <WhatIsThis/>-->
<!--    <GetNFT/>-->
<!--    <RemioArtSession/>-->
<!--    <FollowNow/>-->
<!--  </div>-->
</template>

<script>
import FollowNow from "@/components/FollowNow.vue";
import NFTSet from "@/components/NFTSet.vue";
import WhatIsThis from "@/components/WhatIsThis.vue";
import GetNFT from '@/components/GetNFT.vue';
import RemioArtSession from '@/components/RemioArtSession.vue';

import { TimelineMax, Linear } from 'gsap';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax);
import $ from 'jquery';
export default {
  name: "MainPage",
  components: {FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession},
  mounted(){
    let framePath = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/';
    let nFrames = 130;
    let fileType = ".jpg";
    let pageLengt = 20000;

    let images = [];
    let numberSequence = [];

    function pad(number, length) {
      let str = '' + number;
      while (str.length < length) { str = '0' + str; }
      return str;
    }

    for (let i = 0; i < (nFrames); i++) {
      images.push(framePath +pad(i, 4) + fileType);
    }

    for (let i = 0; i < (nFrames); i++) {
      numberSequence.push(i);
    }

    let obj = {curImg: 0};

    let ImageSequenceTween = new TimelineMax()
        .to(obj, 0.5,
            {
              curImg: images.length - 1,	// animate propery curImg to number of images
              roundProps: "curImg",				// only integers so it can be used as an array index
              repeat: 0,									// repeat 3 times
              immediateRender: true,			// load first image automatically
              ease: Linear.easeNone,			// show every image the same ammount of time
              onUpdate: function () {
                $("#imgsequence").attr("src", images[obj.curImg]);// set the image source
                $("#framesequencenumber").text(numberSequence[obj.curImg]);// set sequence number

              }
            }
        )


      let ImageSequenceController = new ScrollMagic.Controller();

      // build scene --> image sequence
      let scene = new ScrollMagic.Scene({
        triggerElement: ".trigger",
        triggerHook: 0,
        offset: -100,
        duration: pageLengt,
      })
          .setTween(ImageSequenceTween)
          .addIndicators() // add indicators (requires plugin)
          .addTo(ImageSequenceController);
        console.log('scene', scene);
  }
  // data() {
  //   return {
  //     scrollTop: 1,
  //     selectedDog: "",
  //   };
  // },
  // methods: {
  //   handleScroll() {
  //     if (window.scrollY !== 0 && window.scrollY <= 576) {
  //       this.scrollTop = Math.round(window.scrollY / 3);
  //       // console.log('scrollTop', this.scrollTop);
  //     }
  //   },
  // },
  // computed: {
  //   getBackgroundImage() {
  //     return require(`@/assets/3sec_sample/2sec_sample_${this.scrollTop}.png`);
  //   }
  // },
  // mounted() {
  //   window.addEventListener('scroll', this.handleScroll);
  // },
  // beforeUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
};
</script>

<style scoped>
body{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: black;
}

.trigger{
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  color: white;
  width: 20em;
  text-align: center;
  z-index: 1;
  font-size: 2vh;
}

.mobileframe{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 94%;
  height: 96%;
  border: solid 20px white;
  z-index: 1;
  opacity: 0;
}

.frame {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 80vh;
  opacity: 1;
}

.image {
  height: 100%;
  display: block;
  margin: auto;
}

/*#main-page {*/
/*  margin: 0 !important;*/
/*  background-attachment: fixed;*/
/*  background-repeat: no-repeat;*/
/*  background-size: 100% 100%;*/
/*}*/
</style>