import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductDisplay from '@/views/ProductsDisplay.vue'
import LoginOrRegister from '@/views/LoginOrRegister.vue'
import Store from '@/store'
import { getUserFromLocal } from '@/utils'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/productDisplay/cards'
  },
  {
    path: '/productDisplay/:tab',
    name: 'productDisplay',
    component: ProductDisplay,
    props: true
  },
  {
    path: '/loginOrRegister/:type',
    name: 'loginOrRegister',
    component: LoginOrRegister,
    meta: {
      noLayout: true
    },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.name === 'loginOrRegister') {
    next()
  } else {
    if (!Store.state.user.account) {
      await getUserFromLocal()
      if (Store.state.user.account) {
        next()
      } else {
        next({ path: '/loginOrRegister/login' })
      }
    } else {
      next()
    }
  }
})

export default router
