<template>
  <div class="blog-item">
    <img :src="image" alt="Blog Image" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  image: String
})
</script>

<style scoped>
.blog-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
}

.blog-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.blog-item h2 {
  margin-top: 1rem;
  font-size: 1.5rem;
}
</style>
