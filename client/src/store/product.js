import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const product = ref({})

  async function fetchProducts() {
    const response = await axios.get(`http://localhost:8080/products`)
    this.products = response.data.products
  }

  return { products, product, fetchProducts }
})
