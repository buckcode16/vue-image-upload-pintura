<template>
  <div class="font-bold">
    <table>
      <thead>
        <tr
          class="pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100"
        >
          <th class="text-left px-3">ID</th>
          <th class="text-left px-3">Type</th>
          <th class="text-left px-3">Description</th>
          <th class="text-left px-3">Price</th>
          <th class="text-left px-3">Available</th>
          <th class="text-left px-3">Image</th>
          <th class="text-left px-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left p-3">
            {{ product.id }}
          </td>
          <td class="text-left p-3">
            {{ product.type }}
          </td>
          <td class="text-left p-3">
            {{ product.description }}
          </td>
          <td class="text-left p-3">
            {{ product.price }}
          </td>
          <td class="text-left p-3">
            {{ product.available }}
          </td>
          <td class="text-left p-3 w-[100px]">
            <img :src="product.img" alt="" />
          </td>
          <td class="text-left p-3">
            <button
              type="button"
              @click="openModal(product)"
              class="rounded-md bg-primary px-4 py-2 text-md font-bold text-accent hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[1000px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-[500px]"
            >
              <DialogTitle as="h3" class="text-lg font-bold uppercase leading-6 text-accent">
                Edit Product
              </DialogTitle>
              <div class="mt-2">
                <form class="bg-white" @submit.prevent="saveChanges">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                          Type
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="type"
                          type="text"
                          v-model="editingProduct.type"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                          Description
                        </label>
                        <textarea
                          class="shadow appearance-none border rounded w-full h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="description"
                          v-model="editingProduct.description"
                        ></textarea>
                      </div>
                      <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                          Price
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="price"
                          type="number"
                          v-model="editingProduct.price"
                        />
                      </div>
                      <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                          Available
                        </label>
                        <input
                          class=""
                          type="checkbox"
                          id="available"
                          v-model="editingProduct.available"
                        />
                      </div>
                    </div>
                    <!-- <div class="col-span-1">
                      <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                          Frame
                        </label>
                        <div class="flex justify-between items-center px-10">
                          <img
                            class="border-2 border-primary rounded w-[300px]"
                            :src="editingProduct.overlay"
                            alt=""
                          />
                          <button
                            class="m-2 inline-flex justify-center rounded-md border-2 border-primary bg-white px-4 py-2 text-sm font-bold text-accent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click.prevent="uploadImage"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div> -->
                  </div>
                  <div class="mt-4 absolute bottom-5 right-5">
                    <button
                      type="submit"
                      class="m-2 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      class="m-2 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import { useProductStore } from '../../store/product'
import { computed, onMounted, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import axios from 'axios'

const isOpen = ref(false)
const productStore = useProductStore()
const products = computed(() => productStore.products)
const editingProduct = ref({})

function closeModal() {
  isOpen.value = false
  if (editingProduct.value) {
    editingProduct.value = {}
  }
}
function openModal(product) {
  isOpen.value = true
  editingProduct.value = { ...product }
}

function uploadImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (readerEvent) => {
      const imageData = readerEvent.target.result
      console.log(imageData)

      editingProduct.value.overlay = imageData
    }
  }
  input.click()
}

onMounted(() => {
  productStore.fetchProducts()
})

const saveChanges = async () => {
  const index = products.value.findIndex((product) => product.id === editingProduct.value.id)
  products.value[index] = { ...editingProduct.value }
  try {
    const res = await axios.post(`http://localhost:8080/products`, {
      product: editingProduct.value
    })
    window.location.reload()
    console.log(res.data)
  } catch (error) {
    console.error('Updaate product failed:', error)
  }
  closeModal()
}
</script>
