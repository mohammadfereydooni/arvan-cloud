import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router/router';
import './styles/main.css';
import 'vue3-toastify/dist/index.css';

import Vue3Toastify from 'vue3-toastify';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
});
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
});

app.mount('#app');
