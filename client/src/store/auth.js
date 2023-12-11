import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      isAuthenticated.value = true
    }
  }

  watch(
    user,
    (userVal) => {
      localStorage.setItem('user', JSON.stringify(userVal))
    },
    { deep: true }
  )

  // async function fetchUser() {
  //   const res = await fetch('https://localhost:8080/auth/')

  //   const user = await res.json()
  //   this.user = user
  // }

  async function signUp(email, password) {
    const res = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const user = await res.json()
    this.user = user
  }

  async function signIn(email, password) {
    const requestData = {
      email: email,
      password: password
    }
    const response = await axios.post('http://localhost:8080/auth/signin', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const user = await response.data
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user
    this.isAuthenticated = true
  }

  async function signOut() {
    localStorage.removeItem(localStorage.user)
    this.user = null
    this.isAuthenticated = false
  }
  return { isAuthenticated, user, signUp, signIn, signOut }
})
