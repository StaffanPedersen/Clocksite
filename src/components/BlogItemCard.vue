<template>
  <div class="blog-item" @click="openDetail">
    <img class="img-fluid" :src="fullImageUrl" alt="Blog Image" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BlogService from '@/services/BlogService.ts'

const props = defineProps({
  title: String,
  image: String,
  text: String
})

const emit = defineEmits(['open-detail'])

const fullImageUrl = computed(() => BlogService.getImageUrl(props.image))

const openDetail = () => {
  emit('open-detail', {
    title: props.title,
    text: props.text,
    image: fullImageUrl.value
  })
}
</script>

<style scoped>
.blog-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
  max-width: 20%;
  cursor: pointer;
  color: white;
}

.blog-item img {
  width: 80%;
  height: auto;
  border-radius: 8px;
}

.blog-item h2 {
  margin-top: 1rem;
  font-size: 1.5rem;
}
</style>
