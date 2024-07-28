import './scss/Main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

// Check for token on app load
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios
    .get('https://localhost:7188/api/Auth/validate-token')
    .then((response) => {
      // console.log(response.data.message)
      // Token is valid, no need to redirect here
    })
    .catch((error) => {
      // console.error('Token validation failed:', error)
      localStorage.removeItem('token')
    })
}

app.use(createPinia())
app.use(router)
app.mount('#app')
