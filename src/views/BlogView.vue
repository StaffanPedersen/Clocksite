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
import BlogService from '@/services/BlogService.ts'
import BlogItemCard from '@/components/BlogItemCard.vue'
import BlogItemDetail from '@/components/BlogItemDetail.vue'

const blogItems = ref([])
const selectedItem = ref(null)

onMounted(async () => {
  try {
    blogItems.value = await BlogService.getAll()
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
  color: white;
}
</style>
