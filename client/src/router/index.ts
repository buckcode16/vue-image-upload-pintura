import { useAuthStore } from '../store/auth'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/',
    name: 'main-container',
    component: () => import('@/views/MainContainer.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/sign-in',
        name: 'sign-in',
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore()

          if (authStore.isAuthenticated) {
            next('/')
          } else {
            next()
          }
        },
        component: () => import('@/views/SignIn.vue')
      },
      {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/views/SignUp.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order.vue')
      },
      {
        path: '/my-prints',
        name: 'my-prints',
        component: () => import('@/views/Prints.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/Admin.vue')
      },
      {
        path: '/product',
        name: 'product',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/PinturaFilePond.vue'),
        props: true
      }
      // {
      //   path: '/personal',
      //   name: 'personal',
      //   meta: {
      //     requireAuth: true
      //   },
      //   component: () => import('@/views/personal/Personal.vue')
      // },
      // {
      //   path: '/setting',
      //   name: 'setting',
      //   meta: {
      //     requireAuth: true
      //   },
      //   component: () => import('@/views/setting/Setting.vue'),
      //   children: [
      //     {
      //       path: '/setting/PersonalData',
      //       name: 'personalData',
      //       meta: {
      //         requireAuth: true
      //       },
      //       component: () => import('@/views/setting/PersonalData.vue')
      //     }
      //   ]
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page or handle unauthorized access
    next('/sign-in')
  } else {
    next()
  }
})

export default router
