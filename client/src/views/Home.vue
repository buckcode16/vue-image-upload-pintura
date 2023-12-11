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
    <div v-for="product in productList" :key="product.title">
      <Card :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'

const productList = [
  {
    img: '../../src/assets/images/kodak-overlay.png',
    title: 'Kodachrome',
    description:
      'Iconic for its vibrant colors and fine grain, Kodachrome revolutionized photography, capturing history with its saturated brilliance.',
    product: 'lomo',
    path: 'product-1',
    overlay: '../../src/assets/images/kodak-overlay.png'
  },
  {
    img: '../../src/assets/images/overlay2.png',
    title: 'Movie Reel',
    description:
      'A nostalgic tribute to cinemas golden age, the Movie Reel print embodies classic film magic with circular frames that echo the timeless allure of the silver screen.',
    product: 'bookmark',
    path: 'product-2',
    overlay: '../../src/assets/images/overlay2.png'
  },
  {
    img: '../../src/assets/images/overlay3.png',
    title: 'Kodak Portra',
    description:
      'Celebrating natural skin tones and versatility, the Kodak Portra-inspired print captures portraits with exceptional depth and true-to-life colors, telling compelling visual stories.',
    product: 'bookmark',
    path: 'product-3',
    overlay: '../../src/assets/images/overlay3.png'
  }
]
</script>

<style scoped></style>
