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
        <input type="file" @change="onFileChange" ref="fileInput" />
        <img
          v-if="currentImage"
          :src="getImageUrl(currentImage)"
          alt="Current Blog Image"
          class="current-image"
        />
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
const fileInput = ref(null)
const router = useRouter()
const route = useRoute()

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

const onFileChange = (e) => {
  image.value = e.target.files[0]
}

const submitBlog = async () => {
  const blogToUpdate = {
    id: route.params.id,
    title: title.value,
    text: text.value,
    image: currentImage.value // Ensure the current image name is included
  }

  try {
    if (image.value) {
      await BlogService.uploadImage(image.value)
      blogToUpdate.image = image.value.name
    }
    const success = await BlogService.putBlog(blogToUpdate)
    if (success) {
      router.push('/admin/dashboard')
    } else {
      error.value = 'Failed to update blog'
    }
  } catch (err) {
    error.value = 'Failed to update blog'
  }
}

const getImageUrl = (imageName) => {
  return `http://91.192.221.9:5000/images/blog/${imageName}`
}

onMounted(() => {
  fetchBlog()
})
</script>

<style scoped>
.edit-blog {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
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
