import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InventoryManagement from '@/views/InventoryManagement/index.vue'
import LoginOrRegister from '@/views/LoginOrRegister.vue'
import PurchaseManagement from '@/views/PurchaseManagement/index.vue'
import ProductDetail from '@/views/ProductDetail/index.vue'
import Blank from '@/views/Blank.vue'
import SalesRecords from '@/views/SalesManagement/SalesRecords.vue'
import StatisticCharts from '@/views/SalesManagement/StatisticCharts/index.vue'
import SalesReport from '@/views/SalesManagement/SalesReport/index.vue'
import { getUserFromLocal } from '@/utils'
import Store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/inventoryManagement/cards'
  },
  {
    path: '/inventoryManagement/:tab',
    name: 'inventoryManagement',
    component: InventoryManagement,
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
    path: '/productDetail/:_id',
    name: 'productDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/salesRecords',
    name: 'salesRecords',
    component: SalesRecords
  },
  {
    path: '/statisticCharts',
    name: 'statisticCharts',
    component: StatisticCharts
  },
  {
    path: '/salesReport',
    name: 'salesReport',
    component: SalesReport
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
