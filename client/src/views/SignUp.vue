<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <img
        class="object-cover w-[50vw] h-full fixed top-0 left-0 z-[-1]"
        src="https://www.socialprintstudio.com/img/products/brass-print-set/slider/brass-print-set-7.jpg"
        alt=""
      />
    </div>
    <div class="mt-10 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 col-span-1">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="../assets/images/lomo.jpg" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST" @submit.prevent="handleSignUp">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                >Name</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                autocomplete="current-name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Sign up
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Already a user?
          <router-link
            :to="{ name: 'sign-in' }"
            class="font-semibold leading-6 text-secondary hover:text-secondary"
            >Sign in</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const router = useRouter()

const handleSignUp = async () => {
  try {
    await axios.post('http://localhost:8080/auth/signup', {
      email: email.value,
      name: name.value,
      password: password.value
    })

    router.push({ name: 'home' })
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}
</script>

<style scoped></style>
