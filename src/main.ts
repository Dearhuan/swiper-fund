import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()

app.use(router).use(i18n).use(pinia).mount('#app')