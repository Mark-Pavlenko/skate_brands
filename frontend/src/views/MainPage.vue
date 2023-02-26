<template>
  <div class="mobileframe"></div>
  <div class="trigger"><h1>start scrolling</h1></div>
  <div class="frame">
    <div class="overlay">
      <h1 class="framenumber" id="framesequencenumber">
        127
      </h1>
    </div>
    <img  class="image" id="imgsequence" src="http://399.michaelkennedy.ch/bw_frames/0000.jpg" />
  </div>

  <div class="pageExtender"></div>
  <div class="dllink">
    <a id="higreslink" href="" download>download image</a>
  </div>
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

// import {gsap} from "gsap";
// import { TimelineMax } from "gsap/TimelineMax";
// gsap.registerPlugin(TimelineMax);
import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax); // Pass gsap import to Scrollmagic
import $ from 'jquery';
export default {
  name: "MainPage",
  components: {FollowNow, NFTSet, WhatIsThis, GetNFT, RemioArtSession},

  mounted(){

//This script lets you scroll through an image sequence with a correlating number sequence on top of the image. It also creates a download link to a higres image, of the displayed image, located in a separate directory.

//Works on desktop and mobile.

// based on https://scrollmagic.io/examples/expert/image_sequence.html

//  low res and highres images need to be stored in seperate directories with the same file name and named: 0000.fileType, 0001.fileType, 0002.fileType, ...

// works on desktop and mobile!

// include
//jquery https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
//GSAP https://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js
//scrollmagic https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js
//GSAP animation https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js
//scrollmagic debug indicators https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js


// define these vars to your needs

    var framePath = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/'; //Define file path for your images
    var highResPath = "http://399.michaelkennedy.ch/bw_frames/"; //if you have a downloadable high res image, define its path here.
    var nFrames = 201; //Define amount of images. counting starts at 0, to have it count to 400 you would have to ad 401 images.
    var fileType = ".jpg"; //Define your image file type.
    var pageLengt = 20000; // this defines over what distance, in pixels, your image sequence should be displayed. esentally it defines how speady you scroll trough all the individual images. make shure your page has at least this lengt in px aswel.

//no need to change anything further down here.


//Define arrays.

    var images = []; //Define array for images
    var numberSequence = []; //Define array for number sequence
    var higresimages =[]; //Define array for higres images


// ad images with path to array

    function pad(number, length) { // pad numbers with leading zeros for your image sequence
      var str = '' + number;
      while (str.length < length) { str = '0' + str; }
      return str;
    }

    for (let i = 0; i < (nFrames); i++) {//loop through all pictures
      images.push(framePath +pad(i, 4) + fileType); //Add every image to array with pad numbers and file type
    }


// ad higres images with path to array

    for (let i = 0; i < (nFrames); i++) {//loop through all pictures
      higresimages.push(highResPath +pad(i, 4) + fileType); //Add the higResPath to the array with pad numbers and file type
    }


// ad numbers to numbersequence array

    for (let i = 0; i < (nFrames); i++) {
      numberSequence.push(i); //Add N numbers to array
    }


// TweenMax can tween any property of any object. We use this object to cycle through the array
    var obj = {curImg: 0};

// create tween
    var ImageSequenceTween = new TimelineMax()
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
                $("#higreslink").attr("href", higresimages[obj.curImg]);// set higres download link path

              }
            }
        )


// When the DOM is ready
    $(function() {


// init controller
      var ImageSequenceController = new ScrollMagic.Controller();

      // build scene --> image sequence
      var scene = new ScrollMagic.Scene({
        triggerElement: ".trigger",
        triggerHook: 0,
        offset: -100,
        duration: pageLengt,
      })

          .setTween(ImageSequenceTween)
          //.addIndicators() // add indicators (requires plugin)
          .addTo(ImageSequenceController);


        console.log('scene', scene);
    });
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

.overlay {
  position: fixed;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.framenumber{
  font-size: 24vh;
  color: white;

}

.image {
  height: 100%;
  display: block;
  margin: auto;
}

.dllink a{
  position: fixed;
  left: 50%;
  top: 95%;
  transform: translate(-50%, -50%);
  z-index: 2;
  white-space: nowrap;
  color: #FFFFFF;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 100;
  padding: 13px 23px ;
  background-color: #000000;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}


.pageExtender {
  height: 20800px;
  background-color:black;
}

@media screen and (max-width: 420px) {
  .frame {
    height: 100%;
  }

  .dllink a{
    top: 90%;
  }

}

/*#main-page {*/
/*  margin: 0 !important;*/
/*  background-attachment: fixed;*/
/*  background-repeat: no-repeat;*/
/*  background-size: 100% 100%;*/
/*}*/
</style>