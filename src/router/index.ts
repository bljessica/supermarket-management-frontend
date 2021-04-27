import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InventoryManagement from '@/views/InventoryManagement/index.vue'
import Login from '@/views/Login/index.vue'
import PurchaseManagement from '@/views/PurchaseManagement/index.vue'
import PurchaseOrderDetail from '@/views/PurchaseManagement/OrderDetail.vue'
import ProductDetail from '@/views/ProductDetail/index.vue'
import SalesRecords from '@/views/SalesManagement/SalesRecords.vue'
import StatisticCharts from '@/views/SalesManagement/StatisticCharts/index.vue'
import ProductSuggest from '@/views/SalesManagement/ProductSuggest.vue'
import SalesReport from '@/views/SalesManagement/SalesReport/index.vue'
import PersonalCenter from '@/views/PersonalCenter/index.vue'
import UserManagement from '@/views/UserManagement/index.vue'
import { getUserFromLocal } from '@/utils'
import Store from '@/store'
import { socket } from '@/main'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/inventoryManagement/cards'
  },
  {
    path: '/inventoryManagement/:tab',
    name: 'inventoryManagement',
    component: InventoryManagement,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
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
    path: '/purchaseManagement/orderDetail/:orderId',
    name: 'purchaseOrderDetail',
    component: PurchaseOrderDetail,
    props: true
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
    path: '/productSuggest',
    name: 'productSuggest',
    component: ProductSuggest
  },
  {
    path: '/salesReport',
    name: 'salesReport',
    component: SalesReport
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    meta: {
      showAside: false
    },
    component: PersonalCenter
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    component: UserManagement
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!Store.state.user.account) {
      await getUserFromLocal()
      if (Store.state.user.account) {
        // 用户登录后发送用户信息
        if (!Store.state.socketConnected) {
          socket.emit('userLogin', Store.state.user.account)
          Store.state.socketConnected = true
        }
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
})

export default router
