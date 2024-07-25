<template>
  <div class="blog">
    <h1>Blog Page</h1>
    <div class="blog-list">
      <BlogItemCard
        v-for="(blog, index) in blogs"
        :key="index"
        :title="blog.title"
        :image="blog.image"
      />
    </div>
  </div>
</template>

<script setup>
import BlogItemCard from '@/components/BlogitemCard.vue'
const blogs = [
  { title: 'Blog Post 1', image: 'path/to/image1.jpg' },
  { title: 'Blog Post 2', image: 'path/to/image2.jpg' },
  { title: 'Blog Post 2', image: 'path/to/image2.jpg' },
  { title: 'Blog Post 2', image: 'path/to/image2.jpg' },
  { title: 'Blog Post 2', image: 'path/to/image2.jpg' }
]
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
