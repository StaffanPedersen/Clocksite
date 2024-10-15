import axios from 'axios'

const BlogService = (() => {
  const localhost = import.meta.env.VITE_API_URL
  const blogController = `${localhost}api/Blog`
  const imageUploadController = `${localhost}api/ImageUpload`
  const localImageUrl = 'images/blog'

  const getBaseUrl = () => localhost

  const getAuthToken = () => {
    const token = localStorage.getItem('auth-token')
    return token
  }

  const getAll = async () => {
    try {
      const token = getAuthToken()
      const result = await axios.get(blogController, {
        headers: {
          Authorization: token
        }
      })
      return result.data
    } catch (err) {
      if (err instanceof Error) {
        console.error('Unable to contact blogController:', err.message)
      } else {
        console.error('Unable to contact blogController:', err)
      }
      return null
    }
  }

  const getById = async (id: number) => {
    try {
      const token = getAuthToken()
      const result = await axios.get(`${blogController}/${id}`, {
        headers: {
          Authorization: token
        }
      })
      return result.data
    } catch (err) {
      console.log(`Unable to get blog with id ${id}`)
      return null
    }
  }

  const getByName = async (name: string) => {
    try {
      const token = getAuthToken()
      const result = await axios.get(`${blogController}/byName/${name}`, {
        headers: {
          Authorization: token
        }
      })
      return result.data
    } catch (err) {
      console.log(`Unable to get blog with name ${name}`)
      return null
    }
  }

  const putBlog = async (blogToUpdate: { id: number; [key: string]: any }) => {
    try {
      const token = getAuthToken()
      await axios.put(`${blogController}/${blogToUpdate.id}`, blogToUpdate, {
        headers: {
          Authorization: token
        }
      })
      return true
    } catch (err) {
      console.error('Error updating blog:', err)
      return false
    }
  }

  const postBlog = async (newBlog: { [key: string]: any }) => {
    try {
      const token = getAuthToken()
      const result = await axios.post(blogController, newBlog, {
        headers: {
          Authorization: token
        }
      })
      return result.data
    } catch (err) {
      console.error('Error posting blog:', err)
      return null
    }
  }

  const uploadImage = async (image: File) => {
    const formData = new FormData()
    formData.append('formFile', image)

    try {
      const token = getAuthToken()
      await axios.post(imageUploadController, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        }
      })
    } catch (err) {
      console.error('Error uploading image:', err)
      throw err
    }
  }

  const deleteBlog = async (id: number) => {
    try {
      const token = getAuthToken()
      const response = await axios.delete(`${blogController}/${id}`, {
        headers: {
          Authorization: token
        }
      })
      return response.status === 204
    } catch (error) {
      console.error(`Error deleting blog with id ${id}:`, error)
      return false
    }
  }

  const getImageUrl = (imageName: string) => {
    return `${localhost}${localImageUrl}/${imageName}`
  }

  const getFullImageUrl = (imageName: string) => {
    return `${localhost}${localImageUrl}/${imageName}`
  }

  return {
    getAll,
    postBlog,
    putBlog,
    getById,
    getByName,
    deleteBlog,
    uploadImage,
    getImageUrl,
    getFullImageUrl,
    getBaseUrl
  }
})()

export default BlogService
