// import './assets/main.css'

// Import our bootstrap CSS
import './assets/scss/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
