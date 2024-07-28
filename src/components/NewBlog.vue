<template>
  <div class="new-blog">
    <h1>Create New Blog</h1>
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
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BlogService from '@/services/BlogService'

const title = ref('')
const text = ref('')
const image = ref(null)
const error = ref('')
const router = useRouter()

const onFileChange = (e) => {
  image.value = e.target.files[0]
}

const submitBlog = async () => {
  const newBlog = {
    title: title.value,
    text: text.value
  }

  try {
    if (image.value) {
      await BlogService.uploadImage(image.value)
      newBlog.image = image.value.name
    }
    const result = await BlogService.postBlog(newBlog)
    if (result) {
      router.push('/admin/dashboard')
    } else {
      error.value = 'Failed to create blog'
    }
  } catch (err) {
    error.value = 'Failed to create blog'
  }
}
</script>

<style scoped>
.new-blog {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

.new-blog form div {
  margin-bottom: 1rem;
}

.new-blog button {
  padding: 0.5rem 1rem;
}
</style>
