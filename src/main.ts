import './assets/styles/main.css'
import './assets/styles/base.css'
import '@/assets/styles/games-recommendations.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
