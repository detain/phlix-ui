// Dev entry for the primitive Gallery (R0.7). Served by `vite` via gallery.html.
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '../assets/fonts/fonts.css';
import '../tokens/index.css';
import Gallery from './Gallery.vue';

createApp(Gallery).use(createPinia()).mount('#app');
