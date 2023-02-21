<template>
  <div id="huf-nft-set">
    <div id="img-layout">
      <img src="@/assets/images/huf-nft-set.png" alt="huf-nft-set"/>
    </div>
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
    justify-content: center;
    align-items: center;
    background-color: lightgreen;
  }

#img-layout{
}

  #img-layout img{
    max-width: 100%;
  }

@media(max-width: 390px){
  #huf-nft-set{
    height: 680px;
  }
}

@media (min-width: 1280px) {
  #huf-nft-set{
    height: 800px;
  }

  #img-layout{
    width: 743px;
    height: 231px;
  }
}

@media (max-width: 1279px){
  #img-layout{
    margin: 0 19px 0 19px;
  }
}

</style>