<template>
  <div class="flex justify-center items-center font-josefin">
    <div
      class="w-[80%] py-5 border-2 rounded-lg border-primary pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100"
    >
      <div class="px-5">
        <div class="mb-2">
          <router-link :to="{ name: `my-prints` }" class="focus:outline-none hover:underline"
            >Back</router-link
          >
        </div>
        <div class="mb-2">
          <h1 class="text-3xl md:text-5xl font-bold text-secondary uppercase">
            Checkout
          </h1>
        </div>
      </div>
      <div class="bg-white border-t border-b border-primary px-5 py-10 m-4 rounded-lg">
        <div class="w-full">
          <div class="-mx-3 md:flex items-start">
            <div class="px-3 md:w-7/12 lg:pr-10">
              <div class="w-full mx-auto mb-6 border-b border-primary pb-6">
                <div v-for="order in orders">
                  <div v-for="print in order.prints">
                    <div class="grid grid-cols-12">
                      <div class="w-full col-span-3">
                        <h6 class="font-semibold uppercase">
                          <span>Frame type: {{ print.product.type }}</span>
                        </h6>
                        <p class="">x {{ print.images.length }}</p>
                        <div>
                          <span class="font-semibold text-xl"
                            >${{ print.images.length * print.product.price }}</span
                          ><span class="font-semibold">.00</span>
                        </div>
                      </div>
                      <div class="flex flex-row col-span-9">
                        <img
                          class="overflow-hidden rounded-lg w-32 h-32 bg-gray-50 border border-primary m-1"
                          v-for="image in print.images"
                          :key="image.id"
                          :src="image.path"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-primary">
                <div class="-mx-2 flex items-end justify-end">
                  <div class="flex-grow px-2 lg:max-w-xs">
                    <label class="font-semibold mb-2 ml-1">Discount code</label>
                    <div>
                      <input
                        class="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="XXXXXX"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="px-2">
                    <button
                      class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-primary">
                <div class="w-full flex mb-3 items-center">
                  <div class="flex-grow">
                    <span class="">Subtotal</span>
                  </div>
                  <div class="pl-3">
                    <span class="font-semibold">{{ total }}</span>
                  </div>
                </div>
                <div class="w-full flex items-center">
                  <div class="flex-grow">
                    <span class="">Taxes (GST)</span>
                  </div>
                  <div class="pl-3">
                    <span class="font-semibold">{{ (total * 0.06).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-primary md:border-none text-xl">
                <div class="w-full flex items-center">
                  <div class="flex-grow">
                    <span class="">Total</span>
                  </div>
                  <div class="pl-3">
                    <span class="font-semibold">MYR</span>
                    <span class="font-semibold">${{ (total * 1.16).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-3 md:w-5/12">
              <div class="w-full mx-auto rounded-lg bg-white border border-primary p-3 mb-6">
                <div class="w-full flex mb-3 items-center">
                  <div class="w-32">
                    <span class="font-semibold">Contact</span>
                  </div>
                  <div class="flex-grow pl-3">
                    <span>{{ authStore.user.name }}</span>
                  </div>
                </div>
              </div>
              <div class="w-full mx-auto rounded-lg bg-white border border-primary mb-6">
                <div class="w-full p-3 border-b border-primary">
                  <div class="mb-5">
                    <label for="type1" class="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type1"
                        checked
                        @click="showQRCode = false"
                      />
                      <img
                        src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                        class="h-6 ml-3"
                      />
                    </label>
                  </div>
                  <div>
                    <div class="mb-3">
                      <label class="font-semibold mb-2 ml-1">Name on card</label>
                      <div>
                        <input
                          class="w-full px-3 py-2 mb-1 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="John Smith"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="font-semibold mb-2 ml-1">Card number</label>
                      <div>
                        <input
                          class="w-full px-3 py-2 mb-1 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="0000 0000 0000 0000"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="mb-3 -mx-2 flex items-end">
                      <div class="px-2 w-1/4">
                        <label class="font-semibold mb-2 ml-1">Expiration date</label>
                        <div>
                          <select
                            class="form-select w-full px-3 py-2 mb-1 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                          >
                            <option value="01">01 - January</option>
                            <option value="02">02 - February</option>
                            <option value="03">03 - March</option>
                            <option value="04">04 - April</option>
                            <option value="05">05 - May</option>
                            <option value="06">06 - June</option>
                            <option value="07">07 - July</option>
                            <option value="08">08 - August</option>
                            <option value="09">09 - September</option>
                            <option value="10">10 - October</option>
                            <option value="11">11 - November</option>
                            <option value="12">12 - December</option>
                          </select>
                        </div>
                      </div>
                      <div class="px-2 w-1/4">
                        <select
                          class="form-select w-full px-3 py-2 mb-1 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                      <div class="px-2 w-1/4">
                        <label class="font-semibold mb-2 ml-1">Security code</label>
                        <div>
                          <input
                            class="w-full px-3 py-2 mb-1 border border-primary rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="000"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full p-3">
                  <label for="type2" class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type2"
                      @click="showQRCode = false"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      width="80"
                      class="ml-3"
                    />
                  </label>
                </div>
                <div class="w-full p-3">
                  <label for="type3" class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type3"
                      @click="showQRCode = true"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Touch_%27n_Go_eWallet_logo.svg/1200px-Touch_%27n_Go_eWallet_logo.svg.png"
                      width="80"
                      class="ml-3"
                    />
                  </label>

                  <div v-if="showQRCode" class="flex justify-center">
                    <img
                      class="border border-4 border-primary rounded-sm"
                      :src="generateQRCode()"
                      width="200"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="block w-full max-w-xs mx-auto bg-accent hover:bg-accent focus:bg-accent text-white rounded-lg px-3 py-2 font-semibold"
                  @click="makePayment"
                >
                  <i class="mdi mdi-lock-outline mr-1"></i> PAY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userId = ref('')
const orders = ref([])
const total = computed(() => {
  let total = 0
  for (const order of orders.value) {
    for (const print of order.prints) {
      total += print.images.length * print.product.price
    }
  }
  return total
})
const showQRCode = ref(false)

onMounted(() => {
  userId.value = authStore.user?.id
  loadOrders()
})

const generateQRCode = () => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld!`
}

const makePayment = async () => {
  console.log('makePayment')

  // try {
  //   const res = await axios.post(`http://localhost:8080/order/${userId.value}`, {
  //     data: {
  //       prints: selectedPrints.value
  //     }
  //   })
  //   router.go(0)
  // } catch (error) {
  //   console.error('Load images failed:', error)
  // }
}

const loadOrders = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/order/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    orders.value = res.data.filter((order) => order.order_status === 'PENDING_PAYMENT')
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
