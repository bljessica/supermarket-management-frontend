import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import plugin from './plugin'
import * as API from '@/api/api'
import io from 'socket.io-client'

const app = createApp(App)

export const socket = io('http://localhost:3000')

app.config.globalProperties.$api = API
app.config.globalProperties.$socket = socket

// 全局错误处理
app.config.errorHandler = (err: any, vm: any, info: any) => {
  console.error(err, info)
}

app.use(plugin, {
  imports: []
}).use(store).use(router).use(ElementPlus).mount('#app')
