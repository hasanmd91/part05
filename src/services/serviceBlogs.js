import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const blogService = {
  setToken: (newToken) => {
    token = `bearer ${newToken}`
  },

  getAll: async () => {
    const response = await axios.get(baseUrl)
    return response.data
  },

  create: async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  },

  upDate: async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  },
  deleteBlog: async (id) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  },
}

export default blogService
