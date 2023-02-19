import { ComponentCustomProperties } from "vue";

/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  @@ -8,3 +10,9 @@ declare module "mitt" {
  const dumb: any;
  export default dumb;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: Function,
  }
}