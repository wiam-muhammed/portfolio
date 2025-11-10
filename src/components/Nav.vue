<script setup>
import appConfig from '../config/appConfig';

const siteName = appConfig.siteName;
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];
</script>

<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div
      class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between"
    >
      <router-link to="/" class="logo d-flex align-items-center">
        <h1 class="sitename">{{ siteName }}</h1>
      </router-link>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              class="nav-link"
              active-class="active"
              exact
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>
