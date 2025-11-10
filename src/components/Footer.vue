<script setup>
import appConfig from '../config/appConfig';

const siteName = appConfig.siteName;
const footerMessage = 'Thank you for visiting!';
const currentYear = new Date().getFullYear();
const socialLinks = appConfig.socials;
</script>

<template>
  <footer id="footer" class="footer dark-background">
    <div class="container text-center">

      <h3 class="sitename">{{ siteName }}</h3>

      <p>{{ footerMessage }}</p>

      <div class="social-links d-flex justify-content-center">
        <a
          v-for="link in socialLinks"
          :key="link.icon"
          :href="link.url"
          target="_blank"
        >
          <i :class="link.icon"></i>
        </a>
      </div>

      <div class="copyright mt-3">
        <span>&copy; {{ currentYear }}</span>
        <strong class="px-1 sitename">{{ siteName }}</strong>
        <span>All Rights Reserved</span>
      </div>

      <div class="credits">
        Designed by
        <a href="https://bootstrapmade.com/" target="_blank">BootstrapMade</a>
      </div>

    </div>
  </footer>
</template>
