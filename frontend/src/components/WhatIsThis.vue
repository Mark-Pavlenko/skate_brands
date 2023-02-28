<template>
  <div id="layout">
    <div id="block">
      <p id="title">{{$t('what_is_this_title')}}</p>
      <p class="description">{{$t('what_is_this_description')}}</p>
    </div>
    <div id="event-layout">
    <div id="event-items-blocks">
      <div id="event-block" class="item">
        <h3>{{$t('what_is_this_event')}}</h3>
      <p class="description item-description">
        {{$t('what_is_this_event_description')}}
      </p>
      </div>
      <div id="delimiter"></div>
      <div id="item-block" class="item">
        <h3>{{$t('what_is_this_item')}}</h3>
      <p class="description item-description">{{$t('what_is_this_item_description')}}</p>
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
  height: 500px;
}

#title{
  padding-top: 62px;
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 40px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #FFFFFF;
}

.description{
  font-family: 'Noto Sans JP', sans-serif;
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
  justify-content: center;
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
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  color: #FFFFFF;
  letter-spacing: 0.05em;
}

@media (max-width: 750px){
  #layout {
    height: 365px;
  }

  #event-layout{
    display: block;
  }

  #event-items-blocks{
    margin: 55px 27.5px 0 25px;

  }

  #title{
    font-size: 28px;
    line-height: 20px;
  }

  #item-block{
    margin-top: 5px;
  }

  #event-block {
    margin-right: 9px;
    margin-top: 5px;
  }

  #item-block {
    margin-left: 16px;
    width: 170px;
  }

  .description{
    font-size: 13px;
    line-height: 16px;
  }

  .item h3{
    font-size: 20px;
    line-height: 21px;
  }

}

</style>