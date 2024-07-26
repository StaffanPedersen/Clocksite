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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  if (username.value === 'admin' && password.value === 'password') {
    localStorage.setItem('auth', 'true')
    router.push('/admin/dashboard')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.login form div {
  margin-bottom: 1rem;
}

.login button {
  padding: 0.5rem 1rem;
}
</style>
