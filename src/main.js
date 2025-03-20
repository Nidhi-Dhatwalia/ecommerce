import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';  
import 'vuetify/styles';  
import '@mdi/font/css/materialdesignicons.css';  
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);

app.use(vuetify);  
app.use(router);  
app.use(createPinia());  

app.mount('#app');
