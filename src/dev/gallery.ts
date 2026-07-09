/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

// Dev entry for the primitive Gallery (R0.7). Served by `vite` via gallery.html.
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '../assets/fonts/fonts.css';
import '@phlix/tokens/style.css';
import Gallery from './Gallery.vue';

createApp(Gallery).use(createPinia()).mount('#app');
