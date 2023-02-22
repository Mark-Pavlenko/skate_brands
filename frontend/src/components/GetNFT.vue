<template>
  <div id="main">
    <div id="title-block-layout">
      <p id="get-nft-title">GET <br/>YOUR NFT</p>
    </div>
      <img src="@/assets/images/get-nft-card.png" alt="get-nft-card"/>
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
  height: 925px;
  background: #000000;
}

#main img {
  width: 75%;
  margin-bottom: 35px;
}

#title-block-layout{
  flex: 1;
  display: flex;
  align-items: center;
}

#get-nft-title {
  flex: 1;
  display: flex;
  align-items: center;
  position: absolute;
  margin-left: 50px;
  font-family: 'Archivo Expanded';
  font-style: normal;
  font-weight: 800;
  font-size: 120px;
  line-height: 100px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

</style>