<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <button @click="createNewBlog">Create New Blog</button>
    <div v-for="blog in blogs" :key="blog.id" class="blog-item">
      <h2>{{ blog.title }}</h2>
      <button @click="editBlog(blog.id)">Edit</button>
      <button @click="deleteBlog(blog.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BlogService from '@/services/BlogService'

const blogs = ref([])
const router = useRouter()

const fetchBlogs = async () => {
  try {
    const response = await BlogService.getAll()
    if (response) {
      blogs.value = response
    } else {
      console.error('Failed to fetch blogs')
    }
  } catch (err) {
    console.error('Failed to fetch blogs', err)
  }
}

const createNewBlog = () => {
  router.push('/admin/new-blog')
}

const editBlog = (id) => {
  router.push(`/admin/edit-blog/${id}`)
}

const deleteBlog = async (id) => {
  try {
    const success = await BlogService.deleteBlog(id)
    if (success) {
      fetchBlogs()
    } else {
      console.error('Failed to delete blog')
    }
  } catch (err) {
    console.error('Failed to delete blog')
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.blog-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}

.admin-dashboard button {
  margin-right: 1rem;
}
</style>
