<template>
  <div class="font-bold">
    <table>
      <thead>
        <tr
          class="pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100"
        >
          <th class="text-left px-3">ID</th>
          <th class="text-left px-3">Prints</th>
          <th class="text-left px-3">Order Status</th>
          <th class="text-left px-3">Customer</th>
          <th class="text-left px-3">Payment Type</th>
          <th class="text-left px-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <!-- {{
            order.user.name
          }} -->
          <td class="text-left p-3">
            {{ order.id }}
          </td>
          <td class="text-left p-3 flex flex-row" v-for="print in order.prints" :key="print.id">
            <div class="px-1" v-for="img in print.images" :key="img.id">
              <img class="w-[50px] h-full" :src="img.path" alt="" />
            </div>
          </td>
          <td class="text-left p-3">{{ order.order_status }}</td>
          <td class="text-left p-3">{{ order.user.name }}</td>
          <td class="text-left p-3">{{ order.payment_type }}</td>
          <td class="text-left p-3 flex flex-row">
            <button
              :disabled="order.order_status !== 'PAID'"
              type="button"
              @click="confirmOrder(order)"
              class="ml-1 rounded-md bg-primary px-4 py-2 text-md font-bold text-accent hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              :style="{
                'background-color': order.order_status !== 'PAID' ? 'gray' : '#f5eceb',
                color: order.order_status !== 'PAID' ? 'white' : '#a24d44'
              }"
            >
              Confirm
            </button>
            <button
              type="button"
              @click="downloadImages(order)"
              class="ml-1 rounded-md bg-primary px-4 py-2 text-md font-bold text-accent hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '../../store/auth'
import { useProductStore } from '../../store/product'
import { computed, onMounted, ref } from 'vue'
import JSZip from 'jszip'

const authStore = useAuthStore()

const productStore = useProductStore()

const confirmOrder = async (order) => {
  try {
    const res = await axios.post(`http://localhost:8080/order/confirm/${order.id}`)
    window.location.reload()
  } catch (error) {
    console.error('Confrm order failed:', error)
  }
}

onMounted(() => {
  loadOrders()
})

const orders = ref([])

const loadOrders = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/order`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    orders.value = res.data
    console.log(orders.value)
  } catch (error) {
    console.error('Load images failed:', error)
  }
}

const downloadImages = async (order) => {
  const zip = new JSZip()

  // Array to store all fetch promises
  const fetchPromises = []

  order.prints.forEach((print, printIndex) => {
    print.images.forEach((image, imageIndex) => {
      const imageUrl = image.path
      const filename = `print_${printIndex + 1}_image_${imageIndex + 1}.jpg`

      // Create a fetch promise for each image
      const fetchPromise = fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => zip.file(filename, blob))

      fetchPromises.push(fetchPromise)
    })
  })

  await Promise.all(fetchPromises)

  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' })

  // Create a download link and trigger the download
  const link = document.createElement('a')
  link.href = URL.createObjectURL(zipBlob)
  link.download = 'images.zip'
  link.click()
}
</script>
