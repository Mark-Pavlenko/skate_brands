<template>
  <div id="main">
    <div id="title-block-layout">
      <p id="get-nft-title">GET YOUR NFT</p>
      <p id="how-to-get">HOW TO GET</p>
      <p id="description">取得方法：期間内に<span class="en-text">HUF FLAGSHIP STORES</span>または
        <span class="en-text">HUF JAPAN OFFICIAL ONLINE STORE</span>で商品をご購入した方（数に限りがございます）
        配布期間：2023年XX月XX日〜XX月XX日
      </p>
        <a href="#" id="online-store" class="active-link">ONLINE STORE</a>
        <a href="#" class="active-link">SHOP LIST</a>
    </div>
      <img id="get-nft-img" src="@/assets/images/get-nft-card.png" alt="get-nft-card"/>
  </div>
</template>

<script>
export default {
  name: "GetNFT",
};
</script>

<style scoped>

#main {
  display: flex;
  align-items: center;
  height: 1100px;
  background: #000000;
  position: relative;
}

/*#get-nft {*/
/*  !*max-width: 70%;*!*/
/*  position: absolute;*/
/*  top: 0;*/
/*  right: 0;*/
/*  margin-top: 50px;*/
/*}*/

#title-block-layout{
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: 50px;
  color: #FFFFFF;
  z-index: 10;
}

#get-nft-title {
  flex: 1;
  display: flex;
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 120px;
  line-height: 100px;
  letter-spacing: -0.02em;
}

#how-to-get{
  margin-top: 50px;
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 40px;
  letter-spacing: -0.02em;
}

#description {
  font-family: 'Noto Sans JP', sans-serif;
  margin-top: 5px;
  width: 40%;
}

.en-text{
  font-family:  'Archivo', sans-serif;
}

#online-store {
  padding-bottom: 10px;
}

.active-link{
  text-decoration: none;
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #94C93D;
}

#get-nft-img {
  position: absolute;
  right: 0;
  max-width: 100%;
  height: inherit;
  padding-top: 100px;
}

@media all and (min-width: 320px) and (max-width: 1200px) {
  #main{
    height: 700px;
  }

  #title-block-layout{
    margin-left: 20px;
  }

  #how-to-get {
    font-size: 28px;
    line-height: 20px;
  }

  #get-nft-title {
    font-size:60px;
    line-height: 48px;
  }

  #description {
    font-size: 13px;
    line-height: 16px;
    margin-right: 20px;
    width: 90%;
  }

  .active-link{
    font-size: 16px;
    line-height: 17px;
  }

  #get-nft-img {
    padding-top: 60px;

  }
}

@media all and (max-width: 619px) {
  #main {
    height: 600px;
  }

  #get-nft-img{
    margin-bottom: 0;
    width: 100%;
    height: auto !important;
    top: 0;
  }
}

@media screen and (min-width: 620px) and (max-width: 1200px){
  #get-nft-img {
    max-width: 100%;
    max-height: 100%;
    margin-top:50px;
  }

  #description{
    width: 50%;
  }
}


</style>