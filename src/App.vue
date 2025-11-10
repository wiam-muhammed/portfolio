<script setup>
import { onMounted } from "vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import ScrollTop from "./components/ScrollTop.vue";
import Preloader from "./components/Preloader.vue";
import { RouterView } from "vue-router";

onMounted(() => {
  import("./assets/js/app");
});
</script>

<template>
  <Nav />

  <main class="main">
    <RouterView />
  </main>

  <Footer />

  <ScrollTop />

  <Preloader />
</template>
