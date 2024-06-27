import { createApp } from 'vue'
import './style/index.css'
import 'virtual:windi.css'
import 'animate.css'
import App from './App.vue'
import router from './router'
import { axios} from './utils'
import pinia from '@/store'

const app = createApp(App)
//全局绑定axios
app.config.globalProperties.$axios = axios
app.use(router).use(pinia).mount('#app')
