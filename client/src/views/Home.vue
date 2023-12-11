<template>
  <section class="flex justify-center items-center h-[1000px] overflow-hidden">
    <video
      class="fixed top-0 left-0 w-full h-full object-cover z-[-1] opacity-40"
      autoplay
      loop
      muted
    >
      <source src="../assets/mini-photo-prints-5.mp4" type="video/mp4" />
    </video>
    <div v-for="product in products" :key="product.id">
      <Card v-if="product.available" :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'
import { onMounted, ref } from 'vue'
import { useProductStore } from '../store/product'

const productStore = useProductStore()
const products = ref([])

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.products
})
</script>

<style scoped></style>
