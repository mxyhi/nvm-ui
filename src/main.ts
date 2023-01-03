import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@arco-design/web-vue/es/modal/style/css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
