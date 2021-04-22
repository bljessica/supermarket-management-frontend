<template>
  <el-menu
    :router="true"
    :default-active="ASIDE_ITEMS['库存管理'].index"
  >
    <div
      v-for="submenu in Object.values(ASIDE_ITEMS)"
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
import { defineComponent } from 'vue'
import { ASIDE_ITEMS } from '@/constants/constants'

export default defineComponent({
  name: 'Aside',
  setup () {
    return {
      ASIDE_ITEMS
    }
  }
})
</script>
