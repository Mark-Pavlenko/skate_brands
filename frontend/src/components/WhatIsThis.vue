<template>
  <div id="layout">
    <div id="block">
      <p id="title">WHAT IS THIS?</p>
      <p class="description">親愛なるHUFファミリーへ贈る、特別なブランド体験 全３回にわたるアーティストとのコラボレーション</p>
    </div>
    <div id="event-layout">
    <div id="event-items-blocks">
      <div id="event-block" class="item">
        <h3>EVENT</h3>
      <p class="description item-description">
        NFT 保有者のみ参加できる イベントの開催
      </p>
      </div>
      <div id="delimiter"></div>
      <div id="item-block" class="item">
        <h3>ITEM</h3>
      <p class="description item-description" >アーティストのコラボレーション アイテムを限定販売</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhatIsThis",
};
</script>

<style scoped>

#layout {
  background: rgba(16, 16, 16, 0.7);
  height: 405px;
}

#title{
  padding-top: 62px;
  font-family: 'Archivo Expanded', serif;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #FFFFFF;
}

.description{
  font-family: 'YuGothic';
  font-style: normal;
  width: 324px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #FFFFFF;
}

.item-description {
  width: auto;
}

#event-layout{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#event-items-blocks {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 85px;
}

#event-block{
  margin-right: 75px;
  width: 175px;
}

#delimiter{
  height: 95px;
  border: 0.5px solid #949494;
}

#item-block{
  margin-left: 68px;
  width: 202px;
}

.item h3{
  font-family: 'Archivo Expanded';
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  color: #FFFFFF;
  letter-spacing: 0.05em;
}

</style>