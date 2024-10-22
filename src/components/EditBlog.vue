<template>
  <div class="edit-blog">
    <h1>Edit Blog</h1>
    <form @submit.prevent="submitBlog">
      <img
        v-if="currentImage"
        :src="getImageUrl(currentImage)"
        alt="Current Blog Image"
        class="current-image"
      />
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
        <input type="file" @change="onFileChange" ref="fileInput" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BlogService from '@/services/BlogService'
const title = ref('')
const text = ref('')
const image = ref(null)

const currentImage = ref(null)
const error = ref('')
const imageUrl = ref('')
const fileInput = ref(null)
const router = useRouter()
const route = useRoute()
const blogId = route.params.id

const getImageUrl = (image) => {
  return BlogService.getImageUrl(image)
}

const fetchBlog = async () => {
  try {
    const blog = await BlogService.getById(route.params.id)
    if (blog) {
      title.value = blog.title
      text.value = blog.text
      currentImage.value = blog.image
      if (currentImage.value) {
        const file = new File([], currentImage.value)
        Object.defineProperty(file, 'name', {
          writable: true,
          value: currentImage.value
        })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        fileInput.value.files = dataTransfer.files
      }
    } else {
      error.value = 'Failed to fetch blog'
    }
  } catch (err) {
    error.value = 'Failed to fetch blog'
  }
}

onMounted(fetchBlog)

const onFileChange = (e) => {
  image.value = e.target.files[0]
  if (image.value) {
    imageUrl.value = URL.createObjectURL(image.value)
  }
}

const submitBlog = async () => {
  try {
    let newImageUrl = currentImage.value
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
