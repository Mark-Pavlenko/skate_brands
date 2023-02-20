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
    <input id="newsletter-email" type="email" placeholder="Your Email"/>
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
    background-color: #000;
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
    font-family: 'Archivo Expanded', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }

  #newsletter-email{
    width: 377px;
    height: 49px;
    background-color: #303030;
    border: none;
  }

  /*#newsletter-email[type="text"], textarea {*/

  /*  color: #303030;*/
  /*}*/
</style>