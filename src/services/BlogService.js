import axios from 'axios'

const BlogService = (() => {
  const blogController = 'https://localhost:7188/api/Blog'
  const imageUploadController = 'https://localhost:7188/api/imageupload'
  const localImageUrl = '/images/blog'

  const getAll = async () => {
    try {
      const result = await axios.get(blogController)
      return result.data
    } catch (err) {
      console.log('Unable to contact blogController')
    }
  }

  const getById = async (id) => {
    try {
      const result = await axios.get(`${blogController}/${id}`)
      return result.data
    } catch (err) {
      console.log(`Unable to get blog with id ${id}`)
      return null
    }
  }

  const getByName = async (name) => {
    try {
      const result = await axios.get(`${blogController}/byName/${name}`)
      return result.data
    } catch (err) {
      console.log(`Unable to get blog with name ${name}`)
      return null
    }
  }

  const putBlog = async (blogToUpdate) => {
    try {
      const result = await axios.put(`${blogController}/${blogToUpdate.id}`, blogToUpdate)
      return true
    } catch (err) {
      console.error('Error updating blog:', err)
      return false
    }
  }

  const postBlog = async (newBlog) => {
    try {
      const result = await axios.post(blogController, newBlog)
      return result.data
    } catch (err) {
      console.error('Error posting blog:', err)
      return null
    }
  }

  const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append('formFile', image)

    try {
      await axios.post(imageUploadController, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (err) {
      console.error('Error uploading image:', err)
      throw err
    }
  }

  const deleteBlog = async (id) => {
    try {
      const result = await axios.delete(`${blogController}/${id}`)
      return true
    } catch (err) {
      console.error(`Error deleting blog with id ${id}:`, err)
      return false
    }
  }

  const getImageUrl = (imageName) => {
    return `${localImageUrl}/${imageName}`
  }

  return {
    getAll,
    postBlog,
    putBlog,
    getById,
    getByName,
    deleteBlog,
    uploadImage,
    getImageUrl
  }
})()

export default BlogService
