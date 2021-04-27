<template>
  <el-menu
    :router="true"
    :default-openeds="[asideItems['销售管理'].index]"
    :default-active="asideItems['库存管理'].index"
  >
    <div
      v-for="submenu in Object.values(asideItems)"
      :key="submenu.name"
    >
      <el-submenu
        v-if="submenu.items"
        :index="submenu.index"
      >
        <template #title>
          {{ submenu.name }}
        </template>
        <el-menu-item
          v-for="item in submenu.items"
          :key="item.index"
          :index="item.index"
        >
          {{ item.name }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        :index="submenu.index"
      >
        <template #title>
          {{ submenu.name }}
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ASIDE_ITEMS } from '@/constants/constants'
import authMixin from '@/mixins/authMixin'

export default defineComponent({
  name: 'Aside',
  mixins: [authMixin],
  setup () {
    const asideItems = ref({})
    return {
      asideItems
    }
  },
  watch: {
    userRole: {
      handler () {
        if (this.hasAuth('USER_MANAGEMENT')) {
          this.asideItems = {
            ...ASIDE_ITEMS,
            用户管理: {
              name: '用户管理',
              index: '/UserManagement'
            }
          }
        } else {
          this.asideItems = ASIDE_ITEMS
        }
      },
      immediate: true
    }
  }
})
</script>
