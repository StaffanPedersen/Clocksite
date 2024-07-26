<!-- src/components/BlogItemDetail.vue -->
<template>
  <div class="blog-item-detail">
    <button class="close-button" @click="close">X</button>
    <img :src="image" alt="Blog Image" class="blog-image" />
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: String,
  title: String,
  text: String
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.blog-item-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.blog-image {
  max-width: 80%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
