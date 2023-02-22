<template>
  <div id="main">
    <div id="title-block-layout">
      <p id="get-nft-title">GET YOUR NFT</p>
      <p id="how-to-get">HOW TO GET</p>
      <p id="description">取得方法：期間内にHUF FLAGSHIP STORESまたは
        HUF JAPAN OFFICIAL ONLINE STOREで商品をご購入した方（数に限りがございます）
        配布期間：2023年XX月XX日〜XX月XX日
      </p>
      <p class="active-link">ONLINE STORE</p>
      <p class="active-link">SHOP LIST</p>
    </div>
    <div id="img-layout">
      <img src="@/assets/images/get-nft-card.png" alt="get-nft-card"/>
    </div>
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

#main img {
  max-width: 70%;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 50px;
}

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
  font-family: 'Archivo Expanded';
  font-style: normal;
  font-weight: 800;
  font-size: 120px;
  line-height: 100px;
  letter-spacing: -0.02em;
}

#how-to-get{
  margin-top: 50px;
  font-family: 'Archivo Expanded';
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 40px;
  letter-spacing: -0.02em;
}

#description {
  margin-top: 5px;

  width: 530px;
}

.active-link{
  font-family: 'Archivo Expanded';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #94C93D;
}

.active-link:first-child{
  margin-top: 8px;
}

#img-layout{
  display: flex;
  justify-content: end;
}

@media all and (max-width: 600px){
  #main img {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 25px;

  }
}

@media all and (max-width: 750px) {

  #main{
    height: 600px;
  }

  #main img{
    margin-bottom: 0;
  }

  #title-block-layout{
    margin-left: 20px;
    margin-top: 200px;
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
}

</style>