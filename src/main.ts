import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 1. Importe o roteador
import './assets/main.css'

const app = createApp(App)

app.use(router) // 2. Diga ao Vue para usar o roteador
app.mount('#app')