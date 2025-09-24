import axios from 'axios'
import auth from '@/store/auth'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
})

apiClient.interceptors.request.use(
  (config) => {
    const token = auth.state.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient