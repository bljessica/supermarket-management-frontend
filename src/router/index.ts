import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductDisplay from '@/views/ProductsDisplay/index.vue'
import LoginOrRegister from '@/views/LoginOrRegister.vue'
import PurchaseManagement from '@/views/PurchaseManagement/index.vue'
import ProductDetail from '@/views/ProductDetail/index.vue'
import Blank from '@/views/Blank.vue'
import { getUserFromLocal } from '@/utils'
import Store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Blank
    // redirect: '/productDisplay/cards'
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
  },
  {
    path: '/purchaseManagement',
    name: 'purchaseManagement',
    component: PurchaseManagement
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: ProductDetail,
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
