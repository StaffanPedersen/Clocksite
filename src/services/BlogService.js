import axios from 'axios'

const BlogService = (() => {
  const blogController = 'https://localhost:7188/api/Blog'
  const imageUploadController = 'http://localhost:7188/api/imageupload'
  const localImageUrl = '/images/blog'

  const getAll = async () => {
    try {
      const result = await axios.get(blogController)
      console.log(result.data)
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
      console.error('Error updating driver:', err)
      return false
    }
  }

  const postBlog = async (newBlog, image) => {
    let formData

    try {
      const result = await axios.post(blogController, newBlog)
      formData = new FormData()
      formData.append('formfile', image)

      await axios({
        url: imageUploadController,
        method: 'POST',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      return result.data
    } catch (err) {
      console.error('Error posting blog:', err)
      return null
    } finally {
      if (formData) {
        clearFormData(formData)
      }
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

  const clearFormData = (formData) => {
    for (var pair of formData.entries()) {
      formData.delete(pair[0])
    }
  }

  return {
    getAll,
    postBlog,
    putBlog,
    getById,
    getByName,
    deleteBlog,
    getImageUrl
  }
})()

export default BlogService
