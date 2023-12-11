<template>
  <div class="flex justify-center">
    <div
      class="border-2 border-primary rounded-lg pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100"
    >
      <div class="ml-5 mt-5 p-4">
        <h1 class="text-3xl md:text-5xl font-bold text-secondary font-josefin uppercase">
          My Prints
        </h1>
      </div>
      <div class="bg-white border-primary-200 px-5 py-10 font-josefin">
        <div class="flex flex-col justify-center items-center">
          <div class="mt-10">
            <div class="grid grid-cols-12 gap-4 mb-5 border bg-primary border-primary">
              <div class="col-span-1 border-r-4 border-white">
                <h1>Action</h1>
              </div>
              <div class="col-span-1 border-r-4 border-white">
                <h1>Order ID</h1>
              </div>
              <div class="col-span-1 border-r-4 border-white">
                <h1>Order Status</h1>
              </div>
              <div class="col-span-9 border-r-4 border-white">
                <h1>Images</h1>
              </div>
            </div>
            <div
              class="grid grid-cols-12 gap-4 pb-4 border-b mt-2"
              v-for="print in prints"
              :key="print.id"
            >
              <div class="col-span-1 flex flex-col justify-center items-center">
                <input
                  v-if="!print.orderId"
                  type="checkbox"
                  :id="`print-${print.id}`"
                  @change="() => togglePrintSelection(print.id)"
                  :checked="selectedPrints.includes(print.id)"
                  class="form-checkbox text-indigo-600 h-5 w-5"
                />
              </div>
              <div class="col-span-1">
                <h3>{{ print.orderId ? print.orderId : 'Not created' }}</h3>
              </div>
              <div class="col-span-1">
                <h3>
                  {{
                    print.order?.order_status
                      ? print.order.order_status.replace(/_/g, ' ')
                      : 'Not created'
                  }}
                </h3>
              </div>
              <div class="col-span-9">
                <label :for="`print-${print.id}`" class="inline-flex items-center space-x-2">
                  <div class="w-32 flex flex-row gap-2 items-center">
                    <img
                      v-for="image in print.images"
                      :key="image.id"
                      :src="image.path"
                      alt="Print Image"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button
            @click="makeOrder"
            :disabled="selectedPrints.length === 0 || loading"
            class="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-secondary focus:outline-none focus:shadow-outline-secondary active:bg-primary"
          >
            {{ loading ? 'Loading...' : 'Make Order' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userId = ref('')
const prints = ref([])
const selectedPrints = ref([])
const loading = ref(false)

onMounted(() => {
  userId.value = authStore.user?.id
  loadPrints()
})

const togglePrintSelection = (printId) => {
  const index = selectedPrints.value.indexOf(printId)

  if (index === -1) {
    // If not in the array, add it
    selectedPrints.value.push(printId)
  } else {
    // If already in the array, remove it
    selectedPrints.value.splice(index, 1)
  }
}

const makeOrder = async () => {
  loading.value = true
  try {
    const res = await axios.post(`http://localhost:8080/order/${userId.value}`, {
      data: {
        prints: selectedPrints.value
      }
    })
    setTimeout(() => {
      loading.value = false
      router.go(0)
    }, 1000)
  } catch (error) {
    console.error('Load images failed:', error)
  }
}

const loadPrints = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/images/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    prints.value = res.data
  } catch (error) {
    console.error('Load images failed:', error)
  }
}
</script>

<style scoped>
.font-josefin {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
