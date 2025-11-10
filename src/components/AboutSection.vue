<script setup>
import appConfig from "../config/appConfig";
const title = appConfig.userTitle + ".";

const personalInfo = [
  { label: "Phone", value: appConfig.contacts.phone },
  { label: "Email", value: appConfig.contacts.email },
  { label: "Languages", value: "Arabic, English, French, Korean" },
  { label: "Experience", value: "4+ Years" },
  { label: "Services", value: "Translation, Subtitling, Proofreading" },
  { label: "Tools", value: "Trados, MemoQ, Smartcat" },
  { label: "Freelance", value: "Available" },
  { label: "Work Type", value: "Remote" },
];

const half = Math.ceil(personalInfo.length / 2);
const leftCol = personalInfo.slice(0, half);
const rightCol = personalInfo.slice(half);
const cvUrl = "src/assets/pdf/Khaled_Mohamed_cv.pdf";
</script>

<template>
  <section id="about" class="about section">
    <div class="container text-center mb-4" data-aos="fade-up">
      <a :href="cvUrl" download class="btn-download-cv">
        <i class="bi bi-file-earmark-arrow-down"></i> Download CV as a PDF
      </a>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 justify-content-center">
        <div class="col-lg-8 content">
          <h2 class="py-3">{{ title }}</h2>

          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li v-for="item in leftCol" :key="item.label">
                  <i class="bi bi-chevron-right"></i>
                  <strong>{{ item.label }}:</strong>
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>

            <div class="col-lg-6">
              <ul>
                <li v-for="item in rightCol" :key="item.label">
                  <i class="bi bi-chevron-right"></i>
                  <strong>{{ item.label }}:</strong>
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
