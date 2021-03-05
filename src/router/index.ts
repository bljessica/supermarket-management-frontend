import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductDisplay from '@/views/ProductsDisplay.vue'
import LoginOrRegister from '@/views/LoginOrRegister.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
  {
    path: '/productDisplay/:tab',
    name: 'productDisplay',
    component: ProductDisplay,
    props: true
  },
  {
    path: '/loginOrRegister/:type',
    name: 'login',
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

export default router
