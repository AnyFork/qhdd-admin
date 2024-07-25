import { createApp } from 'vue'
import 'virtual:uno.css'
import '@/assets/styles/index.css'
import 'animate.css'
import '@wangeditor/editor/dist/css/style.css'
import App from './App.vue'
import pinia from './store'
import router from './router'

const app = createApp(App)
app.use(pinia).use(router)
app.mount('#app')
