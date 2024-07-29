<template>
  <div class="blog-list">
    <BlogItemCard
      v-for="item in blogItems"
      :key="item.id"
      :title="item.title"
      :image="item.image"
      :text="item.text"
      @open-detail="showDetail"
    />
    <BlogItemDetail
      v-if="selectedItem"
      :title="selectedItem.title"
      :image="selectedItem.image"
      :text="selectedItem.text"
      @close="selectedItem = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BlogItemCard from '@/components/BlogItemCard.vue'
import BlogItemDetail from '@/components/BlogItemDetail.vue'

const blogItems = ref([])
const selectedItem = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://91.192.221.9:5000/api/Blog')
    blogItems.value = response.data
  } catch (error) {
    console.error('Error fetching blog data:', error)
  }
})

const showDetail = (item) => {
  selectedItem.value = item
}
</script>

<style>
.blog {
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
}

.blog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
