<template>
  <div id="main-footer">
    <div class="container_inner d-flex flex-column align-items-flex-start">
      <a href="https://revisionartproject.com/" target="_blank">{{
        $t("donation_site")
      }}</a>
      <a href="" target="_blank">{{ $t("terms") }}</a>
      <a href="" target="_blank">{{ $t("privacy") }}</a>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdzrCEliuSeMPJfZaI3XCAiPfLgnfJH3C8ZUQvNoxB6zlzoOg/viewform?usp=sf_link"
        target="_blank"
        >{{ $t("contact") }}</a
      >
    </div>
    <p id="copyright">©︎2023 UNHCR</p>
  </div>
</template>

<style scoped>
#main-footer {
  padding: 32px;
  background-color: #000;
}
#main-footer a {
  color: #fff;
}
#copyright {
  color: #fff;
  font-size: 16px;
  margin-top: 48px;
}
.flex-column {
  flex-direction: column !important;
  gap: 12px;
}
.align-items-flex-start {
  align-items: flex-start;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainFooter",
});
</script>
