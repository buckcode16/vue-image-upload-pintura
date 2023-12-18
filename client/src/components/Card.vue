<template>
  <div class="w-96 h-[650px] m-2 rounded-lg shadow-lg flex flex-col font-semibold">
    <div>
      <img class="object-cover rounded-t-lg w-96 h-96" :src="product.img" alt="" />
    </div>

    <div
      class="p-6 relative h-1/2 pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-80"
    >
      <h5 class="mb-4 text-xl leading-tight text-neutral-800">
        {{ product.title }}
      </h5>
      <p class="mb-4 text-base text-neutral-600 text-justify">
        {{ product.description }}
      </p>

      <router-link
        @click="setProduct(product)"
        :to="{ name: 'product' }"
        class="absolute bottom-3 left-5 rounded bg-primary text-secondary border-2 border-white rounded-lg px-6 pb-2 pt-2.5 text-xs uppercase leading-normal"
        >Get Started</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useProductStore } from '../store/product'

const productStore = useProductStore()

const props = defineProps({
  product: Object
})

const setProduct = (product) => {
  productStore.product = product
}
</script>

<style scoped></style>
