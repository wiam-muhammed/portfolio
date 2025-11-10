import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue';
import AboutView from '../views/About.vue';
import PortfolioView from '../views/Portfolio.vue';
import ContactView from '../views/Contact.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/portfolio', component: PortfolioView },
  { path: '/contact', component: ContactView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})