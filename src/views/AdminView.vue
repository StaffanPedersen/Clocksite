<template>
  <div class="admin">
    <h1>This is an admin page</h1>
    <AdminLogin v-if="!isAuthenticated" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminLogin from '@/components/AdminLogin.vue'

const isAuthenticated = ref(localStorage.getItem('auth') === 'true')
</script>

<style>
@media (min-width: 1024px) {
  .admin {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
