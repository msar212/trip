import 'normalize.css'
import '@/assets/css/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'

createApp(App).use(router).use(pinia).mount('#app')
