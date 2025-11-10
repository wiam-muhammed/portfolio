<script setup>
import appConfig from "../config/appConfig";
import PageTitle from "../components/PageTitle.vue";

const contactInfo = [
  {
    icon: "bi bi-telephone flex-shrink-0",
    title: "Call Me",
    text: appConfig.contacts.phone,
    link: `tel:${appConfig.contacts.phone}`,
    delay: 200,
  },
  {
    icon: "bi bi-whatsapp flex-shrink-0",
    title: "Whatsapp",
    text: appConfig.contacts.whatsapp,
    link: `https://wa.me/${appConfig.contacts.whatsapp}`,
    delay: 300,
  },
  {
    icon: "bi bi-envelope flex-shrink-0",
    title: "Email Us",
    text: appConfig.contacts.email,
    link: `mailto:${appConfig.contacts.email}`,
    delay: 400,
  },
  {
    icon: "bi bi-share flex-shrink-0",
    title: "Social Profiles",
    isSocial: true,
    delay: 500,
  },
];

const socialLinks = appConfig.socials;
</script>

<template>
  <PageTitle title="Contact">
    Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio
    sint voluptas consequatur ut a odio voluptatem.
  </PageTitle>

  <section id="contact" class="contact section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row gy-4">
        <div
          v-for="item in contactInfo"
          :key="item.title"
          class="col-md-6"
        >
          <div
            class="info-item d-flex align-items-center"
            data-aos="fade-up"
            :data-aos-delay="item.delay"
          >
            <i class="icon" :class="item.icon"></i>
            <div>
              <h3>{{ item.title }}</h3>

              <!-- Normal clickable link -->
              <p v-if="!item.isSocial">
                <a
                  :href="item.link"
                  :target="item.title === 'Call Me' ? null : '_blank'"
                >
                  {{ item.text }}
                </a>
              </p>

              <!-- Social links -->
              <div v-else class="social-links">
                <a
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.url"
                  target="_blank"
                >
                  <i :class="social.icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
