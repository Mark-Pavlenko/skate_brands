<template>
  <div id="main-footer">
    <div id="footer-content">
      <div id="links">
        <a href="#">お問い合わせ</a>
        <a href="#">利用規約</a>
        <a href="#">プライバシーポリシー</a>
        <a href="#" class="en-label">OFFICIAL SITE</a>
      </div>
    </div>
    <p id="copyright">
      ALL RIGHTS RESERVED HUF™ WORLDWIDE ©2022
    </p>
  </div>
</template>

<style scoped>
#main-footer {
  /*position: absolute;*/
  width: 100%;
  height: 112px;
  background-color: #000;
}

#footer-content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 35px;
}

#links{
  display: flex;
  gap: 30px;
}

#links a {
  font-family: 'Noto Sans JP', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #94C93D;
  text-decoration: none;
}

#copyright {
  font-family:  'Archivo', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #949494;
  margin-top:17px;
  margin-bottom: 0;
  text-align: center;
}

.en-label{
  font-family:  'Archivo', sans-serif !important;
}

@media all and (min-width: 320px) and (max-width: 1200px) {
  #links{
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
    margin: 0 10px 0 10px;
  }

  #copyright {
    margin-top: 13px;
  }

  .en-label {
    font-family:  'Archivo', sans-serif !important;
  }
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainFooter",
});
</script>
