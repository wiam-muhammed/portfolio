<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Typed from 'typed.js'
import appConfig from '../config/appConfig'

const name = appConfig.userName

let typedInstance = null

const titles = ['a Translator', 'an Interpreter', 'a Subtitler', 'a Proofreader', 'a Localization Specialist']

onMounted(() => {
  const el = document.querySelector('.typed')

  if (el) {
    typedInstance = new Typed(el, {
      strings: titles,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    })
  }
})

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy()
    typedInstance = null
  }
})
const socialLinks = appConfig.socials;
</script>

<template>
  <section id="hero" class="hero section dark-background">
    <img src="../assets/images/blue light.jpg" alt="" data-aos="fade-in" />

    <div class="container" data-aos="zoom-out" data-aos-delay="100">
      <h2>{{ name }}</h2>

      <p>
        I'm
        <span class="typed"></span>
        <span class="typed-cursor typed-cursor--blink"></span>
      </p>

      <div class="social-links">
        <a v-for="link in socialLinks" :key="link.icon" :href="link.url" target="_blank">
          <i :class="link.icon"></i>
        </a>

        <a href="mailto:weam.mustafa01@gmail.com" target="_blank">
          <i class="bi bi-envelope-fill"></i>
        </a>

        <a href="https://wa.me/201100374501" target="_blank">
          <i class="bi bi-whatsapp"></i>
        </a>
      </div>
    </div>
  </section>
</template>
