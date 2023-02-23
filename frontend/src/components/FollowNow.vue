<template>
  <div id="follow-now-block">
    <div id="follow-label-block">
      <p>FOLLOW NOW</p>
    </div>
    <div id="icons-group">
      <a href="#"><img src="@/assets/icons/facebook.svg" alt="f"/></a>
      <a href="#"><img src="@/assets/icons/instagram.svg" alt="i"/></a>
      <a href="#"><img src="@/assets/icons/twitter.svg" alt="t"/></a>
      <a href="#"><img src="@/assets/icons/youtube.svg" alt="y"/></a>
      <a href="#"><img src="@/assets/icons/line.svg" alt="l"/></a>
    </div>
    <div id="newsletter-label">
      <p>JOIN OUR NEWSLETTER</p>
    </div>
    <div id="email-block">
    <div id="follow-input-wrapper">
      <span>&rarr;</span>
    <input id="newsletter-email" type="email" placeholder="Your Email"/>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowNow",
};
</script>

<style scoped>
  #follow-now-block {
    height: 393px;
    background-color: black;
  }

  #follow-label-block {
    padding-top: 74px;
    padding-bottom: 45px;
  }

  #follow-label-block p {
    font-family: 'Archivo Expanded', sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 0;
    text-align: center;
  }

  #icons-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 30px;
    /*gap: 50px;*/
  }

  #newsletter-label {
    margin-top: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }

  #newsletter-label p {
    font-family: 'Archivo Expanded', sans-serif;
  }

  #email-block {
    display: flex;
    justify-content: center;
  }

  #follow-input-wrapper{
    display: flex;
    align-items: center;
    position: relative;
  }

  #follow-input-wrapper input {
    width: 377px;
    height: 49px;
    background-color: #303030;
    border: none;
  }

  #follow-input-wrapper span {
    position: absolute;
    left: auto;
    top: 13px;
    right: 30px;
    color: #949494;
  }

  span:hover{
    cursor: pointer;
  }
  

  #newsletter-email::placeholder{
    color: #949494;
    font-family: 'Archivo Expanded', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 18px;
  }

  input, textarea{
    color: #FFFFFF;
    padding-left: 21px;
  }

  #newsletter-email:focus{
    outline: none;
  }

  @media all and (min-width: 320px) and (max-width: 1200px) {
    #follow-label-block{
      padding-top:135px;
      padding-bottom: 0;
    }

    #follow-label-block p {
      font-size: 28px;
      line-height: 20px;
    }

    #follow-input-wrapper input {
      width: 267px;
      height: 35px;
    }

    #follow-input-wrapper span{
      top: auto;
    }

    #newsletter-email::placeholder{
      font-size: 12px;
    }

    input, textarea{
      padding-left: 25px;
    }

    #icons-group {
      gap: 20px;
      margin-top: 25px;
    }

    #icons-group img{
      width:30px;
      height:30px;
    }

    #newsletter-label{
      font-size: 12px;
      line-height: 16px;
      margin-top: 35px;
    }
  }
</style>