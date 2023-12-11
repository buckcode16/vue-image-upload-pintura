<template>
  <header>
    <nav class="px-6 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <a href="/" class="flex items-center">
          <h1 class="self-center text-3xl text-secondary font-sacramento whitespace-nowrap">
            XX Memory Dump
          </h1>
        </a>
        <h2 class="font-josefin" v-if="authStore.user">Welcome, {{ authStore.user.name }}</h2>
        <div class="flex items-center flex-col font-josefin border-2 border-primary">
          <router-link
            v-if="isAdmin"
            :to="{ name: 'admin' }"
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
          >
            Manage
          </router-link>

          <router-link
            v-if="!authStore.user"
            :to="{ name: 'sign-up' }"
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
            >Register</router-link
          >
          <router-link
            v-if="authStore.user"
            :to="{ name: 'order' }"
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
            >Order</router-link
          >
          <router-link
            v-if="authStore.user"
            :to="{ name: 'my-prints' }"
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
            >My Prints</router-link
          >
          <router-link
            v-if="!authStore.user"
            :to="{ name: 'sign-in' }"
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
            >Log in</router-link
          >
          <button
            v-else
            class="text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 uppercase"
            @click="handleLogout"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const isAdmin = computed(() => authStore.user?.role === 'ADMIN')

const handleLogout = () => {
  authStore.signOut()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.font-sacramento {
  font-family: 'Sacramento', cursive;
}

.font-josefin {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
