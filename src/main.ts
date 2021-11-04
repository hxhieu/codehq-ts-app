import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import ant from './ant.design'

createApp(App).use(createPinia()).use(router).use(ant).mount('#app')
