<template>
  <div id="remio">
    <div id="remio-title-wrapper">
      <h1>REMIO ART SESSION</h1>
    </div>
    <div id="art-session-layout">
      <img id="remio-art-session" src="@/assets/images/remio-art-session.png" alt="remio-art-session.png"/>
      <img id="remio-art-session-mobile" src="@/assets/images/remio-art-session-mobile.png"
           alt="remio-art-session-mobile.png"/>
    </div>
    <h2 id="date-title">SAT JUNE 6, 7PM-10PM</h2>
    <p id="description">
      第一弾は、アーティストとしてグローバルで活躍する HUFアンバサダーのREMIOがメインゲスト。彼のライブペイントショーや、イベント来場者も参加できるアート作品の制作も行われます。
      開催場所：東京都内（会場情報はNFT Holderのみにお知らせします）
    </p>
    <div id="event-items-blocks">
      <div id="limited-items" class="item">
        <h4>REMIO LIMITED ITEMS</h4>
        <p class="items-subtitle">
          REMIOコラボレーションの限定アイテムを多数販売。
        </p>
        <div id="sweetshots-grid">
          <img src="@/assets/images/sweetshot_1.png" alt="sweetshot_1.png"/>
          <img src="@/assets/images/sweetshot_2.png" alt="sweetshot_2.png"/>
          <img src="@/assets/images/sweetshot_3.png" alt="sweetshot_3.png"/>
        </div>
        <div id="info-list-wrapper">
          <h4 id="info-title-mobile">INFORMATION</h4>
          <ul id="info-list">
            <li> イベントの参加にはNFTが必要です。</li>
            <li> 会員様１名に加えてもう１名の参加が可能です。</li>
            <li> 限定グッズの販売は状況により個数制限を設ける可能性があります。</li>
            <li> 飲食物の持ち込みはご遠慮願います。</li>
            <li> 開催時間内であれば会場の出入りは自由です。</li>
            <li> 当イベントでは新型コロナウイルス感染症対策しています。お客様の安全を第一に考え、</li>
            <li id="no-dot">
              換気、ソーシャルディスタンスによる3密の回避、会場入口での検温、消毒などと共に、
              従業員の体調確認についても徹底管理し万全を期して取り組みますので、どうぞご安心い
              ただければ幸いです。
            </li>
          </ul>
        </div>
      </div>
      <div id="art-block" class="item">
        <h3>REMIO</h3>
        <p class="items-subtitle">
          ノルウェー出身、フランス在住のアーティスト。スプレー、マーカー、シルクスクリーンポスターから立体的な作品制作まで、多様な手法で世界中のファンを魅了し続けている。HUFのアンバサダーとして、現在も活動中。
        </p>
        <div id="column-street-art">
          <img src="@/assets/images/column-street-art.png" alt="column-street-art.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemioArtSession",
};
</script>

<style scoped>

#remio {
  background-color: #000000;
  padding: 250px 50px 0 50px;
}

#remio-title-wrapper {
  position: absolute;
  width: 700px;
  margin-top: -50px;
  z-index: 10;
}

#remio-title-wrapper h1 {
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 120px;
  line-height: 100px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

#art-session-layout img {
  width: 100%;
  height: auto;
}

#date-title {
  width: 632px;
  margin-top: 53px;
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 80px;
  line-height: 69px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
}

#description {
  margin-top: 30px;
  width: 605px;
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.04em;
  color: #FFFFFF;
}

#event-items-blocks {
  display: flex;
  flex-direction: row;
  padding: 45px 0 0 0;
  column-count: 2;
  justify-content: space-between;
}

#limited-items {
  /*width: 560px;*/
}

#limited-items h4 {
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 32px;
  color: #FFFFFF;
}

.items-subtitle {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.04em;
  color: #FFFFFF;
}

#sweetshots-grid {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 475px;
}

#sweetshots-grid img {
  width: 33%;
}

#info-list {
  margin-top: 70px;
  /*padding: 0;*/
  width: 538px;
  margin-left: -12px;
}

#info-list-wrapper {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.04em;
  color: #949494;
}

#no-dot::marker {
  content: none;
}

#art-block {
  margin-left: 68px;
  width: 480px;
}

#art-block h3 {
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 80px;
  line-height: 69px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

#column-street-art img {
  margin-top: 10px;
  width: 100%;
  height: auto;
}

@media all and (max-width: 479px) {
  #remio-art-session {
    display: none;
  }

  #limited-items h4{
    font-size: 20px;
    line-height: 21px;
  }

  #info-title-mobile{
    margin-top: 40px;
    font-family:  'Archivo', sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 21px;
    letter-spacing: -0.02em;
  }

  #description{
    margin-top: 10px;
  }


  #art-block h3{
    font-size: 40px;
    line-height: 36px;
  }

  .items-subtitle{
    font-size: 13px;
    line-height: 16px;
  }
}

@media all and (min-width: 480px) {
  #remio-art-session-mobile{
    display: none;
  }

  #info-title-mobile {
    display: none;
  }
}

@media all and (min-width: 320px) and (max-width: 1200px) {
  #remio {
    padding: 90px 20px 0 20px;
  }

  #event-items-blocks {
    flex-direction: column;
    column-count: 1;
    padding: 30px 0 0 0;
  }

  #art-block {
    margin-left: auto;
    width: auto;
  }

  #remio-title-wrapper {
    width: auto;
  }

  #date-title {
    width: auto;
    font-size: 40px;
    line-height: 36px;
    margin-top: 30px;
  }

  #remio-title-wrapper h1 {
    font-size: 60px;
    line-height: 48px;

  }

  #description {
    width: auto;
  }

  #sweetshots-grid {
    width: auto;
  }

  #art-block {
    margin-top: 70px;
  }

  #info-list{
    width: auto;
    margin-top: 10px;
    font-family: 'Noto Sans JP', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.03em;
    color: #FFFFFF;
  }
}

@media all and (min-width: 1440px) {
  #event-items-blocks {
    column-gap: normal;
    justify-content: space-between;
  }
}


</style>