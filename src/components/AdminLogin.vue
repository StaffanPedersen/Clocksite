<template>
  <div class="login">
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const  localhost = import.meta.env.VITE_API_URL

const login = async () => {
  if (!username.value || !password.value) {
    error.value = 'Username and password are required'
    return
  }

  try {
    const response = await axios.post(`${localhost}api/Auth/login `, {
      username: username.value,
      password: password.value
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      await router.push('/admin/dashboard')
    } else {
      error.value = 'No token received'
    }
  } catch (err) {
    error.value = 'Invalid credentials or server error'
  }
}

// Redirect to dashboard if token exists
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/admin/dashboard')
  }
})
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  color: white;
}

.login form div {
  margin-bottom: 1rem;
}

.login button {
  padding: 0.5rem 1rem;
}
</style>
