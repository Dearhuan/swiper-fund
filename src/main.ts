import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import echarts from './utils/echarts'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.provide('$echarts', echarts)