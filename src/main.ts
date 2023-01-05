import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@/styles/index.tw.css';
import '@arco-design/web-vue/es/modal/style/css';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.setAttribute('arco-theme', 'dark');
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', mediaQueryList => {
    if (mediaQueryList.matches) {
      alert('您切换到深色模式了！');
      document.body.setAttribute('arco-theme', 'dark');
    }
  });
window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', mediaQueryList => {
    if (mediaQueryList.matches) {
      document.body.removeAttribute('arco-theme');
    }
  });

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
