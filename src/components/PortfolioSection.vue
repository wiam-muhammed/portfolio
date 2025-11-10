<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

const activeFilter = ref("*");
const portfolioItems = ref([]);
const filters = ref([{ name: "All", value: "*" }]);
let iso = ref(null);
let lightbox = null;

let lastFocusedElement = null;
let inertBackgroundElements = [];

// --------------------- Lightbox accessibility ---------------------
function setBackgroundInertForLightbox() {
  const activeEl = document.activeElement;
  if (activeEl && activeEl instanceof HTMLElement) {
    lastFocusedElement = activeEl;
    activeEl.blur();
  }

  inertBackgroundElements = [];
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach((el) => {
    const classList = el.classList || { contains: () => false };
    const isLightboxEl =
      classList.contains("glightbox-container") ||
      classList.contains("glightbox-overlay");
    if (!isLightboxEl) {
      if (!el.hasAttribute("inert")) {
        el.setAttribute("inert", "");
        inertBackgroundElements.push(el);
      }
    }
  });
}

function clearBackgroundInert() {
  inertBackgroundElements.forEach((el) => el.removeAttribute("inert"));
  inertBackgroundElements = [];
  if (lastFocusedElement && lastFocusedElement instanceof HTMLElement) {
    try {
      lastFocusedElement.focus();
    } catch (_) {}
    lastFocusedElement = null;
  }
}

// --------------------- Thumbnails ---------------------
function getYoutubeThumbnail(url) {
  const idMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (idMatch) return `https://img.youtube.com/vi/${idMatch[1]}/hqdefault.jpg`;
  return "/portfolio/data/images/video.png";
}

function getWebsiteThumbnail(url) {
  let formattedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    formattedUrl = 'https://' + url;
  }
  const encodedUrl = encodeURIComponent(formattedUrl);
  return `https://image.thum.io/get/width/800/crop/800/${encodedUrl}`;
}

function handleImageError(event) {
  const target = event.target;
  if (!target.dataset.fallbackUsed) {
    target.dataset.fallbackUsed = 'true';
    const originalSrc = target.src;
    if (originalSrc.includes('thum.io')) {
      const urlMatch = originalSrc.match(/crop\/800\/(.+)$/);
      if (urlMatch) {
        const decodedUrl = decodeURIComponent(urlMatch[1]);
        target.src = `https://mini.s-shot.ru/1024x768/800/png/?${encodeURIComponent(decodedUrl)}`;
        return;
      }
    }
    target.src = '/portfolio/data/images/pdf.png';
  }
}

// --------------------- Links ---------------------
function onWebsiteClick(event) {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
  window.open(event.currentTarget.href, "_blank", "noopener");
}

function convertGoogleDriveUrl(url) {
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
}

function getPdfUrl(url) {
  if (url.includes('drive.google.com')) {
    return convertGoogleDriveUrl(url);
  }
  return url;
}

function getPdfThumbnail(url) {
  let pdfUrl = url;
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w800`;
    }
  }
  const encodedUrl = encodeURIComponent(pdfUrl);
  return `https://image.thum.io/get/width/800/crop/800/noanimate/${encodedUrl}`;
}

// --------------------- PDF Fullscreen ---------------------
function forcePdfFullscreen() {
  const container = document.querySelector('.glightbox-container');
  const content = document.querySelector('.glightbox-content');
  const iframe = document.querySelector('.glightbox-iframe');
  const closeBtn = document.querySelector('.glightbox-close');

  if (container) Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    maxHeight: '100vh',
    zIndex: '9999',
  });

  if (content) Object.assign(content.style, {
    width: '100vw',
    height: '100vh',
    padding: '0',
    margin: '0'
  });

  if (iframe) Object.assign(iframe.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    border: 'none',
    margin: '0',
    padding: '0',
    zIndex: '9999',
  });

  if (closeBtn) Object.assign(closeBtn.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: '10000',
    display: 'flex'
  });

  document.body.style.overflow = 'hidden';
}

// --------------------- Fetch portfolio ---------------------
onMounted(async () => {
  try {
    const response = await fetch("/portfolio/json/portfolio.json");
    const data = await response.json();

    portfolioItems.value = data.map((item, index) => ({
      ...item,
      id: index + 1,
      filterClass: `filter-${item.type}s`,
      thumbnail:
        item.type === "video"
          ? getYoutubeThumbnail(item.url)
          : item.type === "website" || item.type === "external"
          ? getWebsiteThumbnail(item.url)
          : item.type === "pdf"
          ? getPdfThumbnail(item.url)
          : item.thumbnail || "/portfolio/data/images/pdf.png",
      displayUrl: item.type === "pdf" ? getPdfUrl(item.url) : item.url,
    }));

    const types = [...new Set(data.map((item) => item.type))];
    types.forEach((type) => {
      filters.value.push({
        name: type.charAt(0).toUpperCase() + type.slice(1) + "s",
        value: `.filter-${type}s`,
      });
    });

    await nextTick();

    const container = document.querySelector(".isotope-container");
    container.querySelectorAll(".isotope-item").forEach((el) => {
      el.removeAttribute("data-aos");
      el.removeAttribute("data-aos-delay");
      el.removeAttribute("data-aos-duration");
    });

    imagesLoaded(container, () => {
      iso.value = new Isotope(container, {
        itemSelector: ".isotope-item",
        layoutMode: "masonry",
        percentPosition: true,
        masonry: { columnWidth: ".isotope-item" },
        transitionDuration: "0.4s",
        stagger: 30,
        hiddenStyle: { opacity: 0, transform: "scale(0.95)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });

      lightbox = GLightbox({
        selector: ".portfolio-link:not(.website-link)",
        openEffect: "fade",
        closeEffect: "fade",
        loop: true,
        height: "80%",
        width: "80%",
        autofocus: false,
      });

      // Force PDF full screen on open and slide change
      lightbox.on('open', () => {
        setBackgroundInertForLightbox();
        forcePdfFullscreen();
      });

      lightbox.on('slideChange', () => {
        forcePdfFullscreen();
      });

      lightbox.on('close', () => {
        document.body.style.overflow = '';
        const container = document.querySelector('.glightbox-container');
        const content = document.querySelector('.glightbox-content');
        const iframe = document.querySelector('.glightbox-iframe');
        const closeBtn = document.querySelector('.glightbox-close');

        if (container) container.style.cssText = '';
        if (content) content.style.cssText = '';
        if (iframe) iframe.style.cssText = '';
        if (closeBtn) closeBtn.style.cssText = '';

        clearBackgroundInert();
      });
    });
  } catch (error) {
    console.error("Failed to load portfolio JSON:", error);
  }
});

onBeforeUnmount(() => {
  if (lightbox) lightbox.destroy();
  clearBackgroundInert();
  if (iso.value) iso.value.destroy();
});

// --------------------- Filter ---------------------
const filterItems = (filterValue, event) => {
  activeFilter.value = filterValue;
  if (iso.value) requestAnimationFrame(() => iso.value.arrange({ filter: filterValue }));

  const buttons = event.currentTarget.parentNode.querySelectorAll("li");
  buttons.forEach((btn) => btn.classList.remove("filter-active"));
  event.currentTarget.classList.add("filter-active");
};
</script>

<template>
  <section id="portfolio" class="portfolio section">
    <div class="container">
      <div class="isotope-layout" data-default-filter="*" data-layout="masonry">
        <ul class="portfolio-filters isotope-filters">
          <li
            v-for="filter in filters"
            :key="filter.value"
            :class="{ 'filter-active': activeFilter === filter.value }"
            @click="filterItems(filter.value, $event)"
          >
            {{ filter.name }}
          </li>
        </ul>

        <div class="row gy-4 isotope-container">
          <div
            v-for="item in portfolioItems"
            :key="item.id"
            class="col-lg-4 col-md-6 portfolio-item isotope-item"
            :class="item.filterClass"
          >
            <a
              :href="item.displayUrl || item.url"
              class="portfolio-link"
              :class="{ 
                'website-link': item.type === 'website' || item.type === 'external',
                'pdf-link': item.type === 'pdf'
              }"
              :target="item.type === 'website' || item.type === 'external' ? '_blank' : null"
              :rel="item.type === 'website' || item.type === 'external' ? 'noopener noreferrer' : null"
              v-bind="
                item.type === 'video'
                  ? { 'data-type': 'video', 'data-source': 'youtube', 'data-poster': item.thumbnail }
                  : item.type === 'pdf'
                  ? { 'data-type': 'external', 'data-width': '100%', 'data-height': '100%' }
                  : {}
              "
              @click="(item.type === 'website' || item.type === 'external') && onWebsiteClick($event)"
            >
              <div class="portfolio-content h-100">
                <div class="portfolio-thumbnail">
                  <img 
                    :src="item.thumbnail" 
                    class="img-fluid" 
                    :alt="item.type"
                    @error="handleImageError"
                  />
                </div>
                <div class="portfolio-info">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.isotope-container {
  position: relative;
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.portfolio-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.portfolio-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-info {
  padding: 12px;
  flex: 1;
}
</style>
