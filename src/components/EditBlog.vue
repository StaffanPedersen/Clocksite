<template>
  <div class="edit-blog">
    <h1>Edit Blog</h1>
    <form @submit.prevent="submitBlog">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" required />
      </div>
      <div>
        <label for="text">Text:</label>
        <textarea v-model="text" required></textarea>
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" @change="onFileChange" />
        <img v-if="imageUrl" :src="imageUrl" alt="Current Image" class="current-image" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BlogService from '@/services/BlogService.ts'

const title = ref('')
const text = ref('')
const image = ref(null)
const imageUrl = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()
const blogId = route.params.id

const fetchBlog = async () => {
  try {
    const blog = await BlogService.getBlog(blogId)
    title.value = blog.title
    text.value = blog.text
    imageUrl.value = blog.imageUrl
  } catch (err) {
    console.error('Error fetching blog:', err)
    error.value = 'Error fetching blog'
  }
}

onMounted(fetchBlog)

const onFileChange = (e) => {
  image.value = e.target.files[0]
}

const submitBlog = async () => {
  try {
    let newImageUrl = imageUrl.value
    if (image.value) {
      const response = await BlogService.uploadImage(image.value, text.value)
      newImageUrl = response.fileName
    }

    const updatedBlog = {
      id: blogId,
      title: title.value,
      text: text.value,
      image: newImageUrl
    }

    const result = await BlogService.putBlog(updatedBlog)
    if (result) {
      router.push('/admin/dashboard')
    } else {
      error.value = 'Failed to update blog'
    }
  } catch (err) {
    console.error('Error submitting blog:', err)
    error.value = err.message || 'Error submitting blog'
  }
}
</script>

<style scoped>
.edit-blog {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  color: white;
}

.edit-blog form div {
  margin-bottom: 1rem;
}

.edit-blog button {
  padding: 0.5rem 1rem;
}

.current-image {
  width: 100px;
  height: auto;
  margin-top: 1rem;
}
</style>
