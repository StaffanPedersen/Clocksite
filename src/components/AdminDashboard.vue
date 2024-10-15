<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <p>Logged in as: {{ username }}</p>
    <p>Roles: {{ roles.join(', ') }}</p>
    <button v-if="isAdminOrEditor" @click="createNewBlog">Create New Blog</button>
    <div v-for="blog in blogs" :key="blog.id" class="blog-item">
      <h2>
        {{ blog.title }}
        <img
          v-if="blog.image"
          :src="getImageUrl(blog.image)"
          alt="Blog Image"
          class="blog-thumbnail"
        />
      </h2>
      <button v-if="isAdminOrEditor" @click="editBlog(blog.id)">Edit</button>
      <button v-if="isAdmin" @click="deleteBlog(blog.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import BlogService from '@/services/BlogService.ts'

const blogs = ref([])
const router = useRouter()
const username = ref('')
const roles = ref([])
const isAdmin = ref(false)
const isAdminOrEditor = ref(false)

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

const getImageUrl = (imageName) => {
  return BlogService.getImageUrl(imageName)
}

const getUserInfo = () => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    const decodedToken = jwtDecode(token)
    username.value = decodedToken.unique_name || decodedToken.name
    roles.value = decodedToken.role.split(',')
    isAdmin.value = roles.value.includes('Admin')
    isAdminOrEditor.value = roles.value.includes('Admin') || roles.value.includes('Editor')
  }
}


onMounted(() => {
  fetchBlogs()
  getUserInfo()
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  color: white;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
}

.blog-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-thumbnail {
  width: 50px;
  height: auto;
  margin-left: 1rem;
}

.admin-dashboard button {
  margin-right: 1rem;
}
</style>
