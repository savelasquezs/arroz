import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
const pinia = createPinia();
import router from './router/main';

createApp(App).use(router).use(pinia).mount('#app');
