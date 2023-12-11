// useAuth.js
import { ref } from 'vue'

const accessToken = ref(localStorage.getItem('accessToken') || null)

const setAccessToken = (token) => {
  accessToken.value = token
  localStorage.setItem('accessToken', token)
}

const removeAccessToken = () => {
  accessToken.value = null
  localStorage.removeItem('accessToken')
}

const isAuthenticated = () => {
  return accessToken.value !== null
}

export { accessToken, setAccessToken, removeAccessToken, isAuthenticated }
