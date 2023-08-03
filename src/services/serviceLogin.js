import axios from 'axios'
const baseurl = '/api/login'


const loginService = {
  login :async (credentials) => {
    const response = await axios.post(baseurl, credentials)
    return response.data
  }

}

export default loginService
