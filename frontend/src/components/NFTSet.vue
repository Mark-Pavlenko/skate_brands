<template>
  <div id="huf-nft-set">
    <div id="img-layout">
      <img src="@/assets/images/huf-nft-set.png" alt="huf-nft-set"/>
    </div>
      <button id="join-now-btn">JOIN NOW</button>
  </div>
</template>

<script>
export default {
  name: "NFTSet",
};
</script>

<style scoped>
  #huf-nft-set {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #img-layout img{
    max-width: 100%;
  }

  #join-now-layout{

  }

  #join-now-btn {
    color: #94C93D;
    border: 2px solid #94C93D;
  }

@media(max-width: 1279px){
  #huf-nft-set{
    height: 680px;
  }

  #img-layout{
    margin: 0 19px 0 19px;
  }
}

  @media(min-width: 745px){
    #img-layout{
      width: 743px;
      height: 231px;
    }
  }

@media (min-width: 1280px) {
  #huf-nft-set{
    height: 800px;
  }
}

</style>