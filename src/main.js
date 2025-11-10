import "./style.css";
import { createApp } from "vue";
import AOS from "aos";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.vue";
import { router } from "./router";

createApp(App).use(router).mount("#app");

AOS.init({
  duration: 600,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});